import { environment } from "../../../environments/environment";
 

export class Constants {
    // Menu
    static readonly AppConfigMenu = "appconfiguration";
    static readonly AppSettingsMenu = "appsettings";
    static readonly ProfileMenu = "myprofile";

    static readonly DATE_FMT = 'MM/dd/yyyy';
    static readonly DATE_TIME_FMT = `${Constants.DATE_FMT} hh:mm:ss a`;

    static readonly PORTAL_BASE_URL=environment.portal_api_url;
    static readonly SECURITY_ADMIN_BASE_URL=environment.security_admin_api_url;
    static readonly ApplicationId = "8";

   
    static readonly APP_NAME = "Portal";
    static readonly LOG_API_URL = "/log/";
    static readonly ApplicationName = "Investment Manager";
    static readonly FileFormatJPG = "image/jpg";
    static readonly FileFormatJPEG = "image/jpeg";
    static readonly FileFormatPNG = "image/png";
     
  }

  export enum UserPreferencesKeyValue {
    ApplicationSequenceintheDashboard = 8001,
    Flagtoshowhidetheannouncements = 8002,
    StarupPage = 8003,
    NotifyOnAttachmentUpload = 8004,
    NotifyOnAttachmentDeletion = 8005,
  }

  export class Messages {
    //Dashboard
    static readonly FETCH_DATA_FAILED = "Unable to fetch dashboard data. Please refresh.";
    static readonly DOCUMENT_NOT_FOUND = "Document not found in store.";
    static readonly TILE_SEQUENCE_UPDATED = "Tile sequence has been updated successfully.";
    static readonly TILE_SEQUENCE_UPDATED_FAILED = "Error while updating Tile sequence. Please try again or contact support.";
  }
 
