import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UploadService } from './upload.component.service';
import '../helper/string.extensions';
import { ToastrService } from 'ngx-toastr'
import { FileUploader, FileItem } from 'ng2-file-upload';
import { UploadFile } from 'ngx-file-drop';
import { Messages } from '../helper/constants';
import { DBLoggerService } from '../services/db-logger.service';

@Component({
    selector: 'upload-component',
    templateUrl: './upload.component.html'
})

export class UploadComponent {

    uploadedReportName: string = "";
    filesUploadedSuccessfully: number[] = [];
    @Input() folderId: string | number;
    @Input() allowedFileLimit: number;
    @Output() uploadedFileInfo = new EventEmitter(); // this will be passed to parent component

    public uploader: FileUploader = new FileUploader({
        allowedMimeType: [
            "text/plain",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-excel.sheet.macroEnabled.12",
            "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
            "application/vnd.ms-excel.template.macroEnabled.12",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "image/bmp",
            "application/x-prn",
            "image/png",
            "image/jpeg"
        ]
    });

    filesToUpload: Array<File> = [];
    public progress: number;
    public message: string;
    public uploadFileName: string;

    constructor(private _uploadService: UploadService,
        private _toastrService: ToastrService,
        private _http: HttpClient,
        private _dbLogger: DBLoggerService) {
        this.uploadFileName = "Choose a file..."
    }

    ngOnInit() {
        this.uploader.onWhenAddingFileFailed = (item) => {
            this._toastrService.error(Messages.FILE_TYPE_NOT_SUPPORTED);
        };

        this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
            fileItem.withCredentials = false;
        };

        this.uploader.uploadAll = () => this.UploadAllFiles(this.uploader.queue);
    }

    public async UploadAllFiles(files: FileItem[]) {
        var index = 0;
        var fileCount = files.length - 1;
        if (files.length > this.allowedFileLimit) {
            this._toastrService.info(Messages.FILE_LIMIT_EXCEEDS);
            return false;
        }
        await Promise.all(files.map(async (file) => {
            console.log('Execution Started' + index)
            await this.SaveFile(file);
            console.log('Execution finished' + index)
            index = index + 1;
        })).then(() => {
            console.log('Final Refresh')
            // last file saved
            this.uploadedFileInfo.emit(
                {
                    'StatusCode': 200,
                });
        });
    }

    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }

    //Fild drap/drop
    public files: UploadFile[] = [];

    public fileOver(event) {
        // console.log(event);
    }

    public fileLeave(event) {
        //console.log(event);
    }

    public async SaveFile(fileItem: any) {
        var file = fileItem._file;
        const formData = new FormData();
        formData.append('applicationID', "8");
        formData.append('folderId', this.folderId.toString());
        formData.append('reportName', file.name);
        formData.append("uploadFile", file);

        await this._uploadService.upload(formData).toPromise().then(data => {
            if (data && data.StatusCode == 200) {
                this.uploadedReportName = "";
                this.filesToUpload = null;
                this.uploadFileName = "";
                var message = Messages.REPORTS_UPDATED_SUCCESS.replace("{0}", file.name);
                this._toastrService.success(message);
                this.uploader.removeFromQueue(fileItem);
            }
            else {
                if (data && data.StatusCode != 409) {
                    var message = Messages.FILE_UPLOAD_FAILED.replace("{0}", file.name);
                    this._toastrService.error(message);
                }
            }
        }).catch(error => {
            // Still Refresh the Grid and tree View of Home Controller  
            this._dbLogger.error(error.message, error.stack);
            if (error.status == 409) ///duplciate file
            {
                var message = Messages.FILE_ALREADY_EXIST.replace("{0}", file.name);
                this._toastrService.info(message);
            }
            if (error.status == 406) ///Character limit exceeds file
            {
                var message = Messages.REPORT_NAME_LIMIT_EXCEEDS.replace("{0}", file.name);
                this._toastrService.info(message);
            }
            else
            {
                var message = Messages.FILE_UPLOAD_FAILED.replace("{0}", file.name);
                this._toastrService.error(message);                
            }
        })
    }
}
