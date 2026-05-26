# VocabApp Proguard Rules
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
-keepattributes JavascriptInterface
-dontwarn android.webkit.*
