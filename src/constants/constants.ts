export class Constants {



    /**
    ******************** app.ts *************************
    */
    //Checking certificate pinning after every 10 min
    public static CHECK_CERTIFICATE_TIMER: number = 60 * 10 * 1000; // 10 min
    //Device will be logged out in case of idle time
    public static IDLE_TIMEOUT: number =  0.25 * 60 * 1000; //  1 min
    //In case of unauthorized access
    public static UNAUTHORIZED: number = 401;
    public static REDIRECT_URI: string = "https://localhost/callback";

    public static CERTIFICATE_PINNING: any = {
        "android": "https://cloudsso.cisco.com",
        "android_fp": "5a ae a8 21 4a 91 ad f7 63 40 c9 4b 39 54 86 3e 73 6f 39 fa",
        "ios": "https://wwwin-spb2b.cisco.com:8443",
        "ios_fp": "51 F1 9D F2 81 B9 A8 0E F0 45 89 33 50 9B 02 C9 55 5D 2B F1",
    }


}
