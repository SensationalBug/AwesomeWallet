package com.awesomewallet

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
// No necesitamos importar FragmentActivity si ReactActivity ya lo hereda internamente
// import androidx.fragment.app.FragmentActivity

class MainActivity : ReactActivity() { // ¡Asegúrate de que extienda ReactActivity!

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "AwesomeWallet"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  // **IMPORTANTE:** Elimina cualquier método `onCreate` que hayas añadido,
  // a menos que tengas una lógica muy específica y no relacionada con React Native
  // que necesite ser ejecutada allí. Si lo tienes, asegúrate de que llame a `super.onCreate(savedInstanceState)`
  // como la primera línea.
  /*
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    // Cualquier otra lógica personalizada que tengas aquí, si la hay.
  }
  */
}