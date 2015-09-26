cordova build --release android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore G:\innFancyApp\ionic-hostel\platforms\android\build\outputs\apk\my-release-key.keystore G:\innFancyApp\ionic-hostel\platforms\android\build\outputs\apk\android-release-unsigned.apk hostel-app-key
cd G:\innFancyApp\ionic-hostel\platforms\android\build\outputs\apk
del innfancy.apk
cd C:\Users\lk\AppData\Local\Android\sdk\build-tools\23.0.0\
zipalign  -v 4 G:\innFancyApp\ionic-hostel\platforms\android\build\outputs\apk\android-release-unsigned.apk G:\innFancyApp\ionic-hostel\platforms\android\build\outputs\apk\innfancy.apk