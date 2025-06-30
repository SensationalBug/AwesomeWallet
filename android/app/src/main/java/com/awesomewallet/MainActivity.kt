package com.awesomewallet

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import android.os.Bundle
import androidx.fragment.app.FragmentActivity // Esta importación ya estaba, ¡excelente!

// La clase MainActivity ahora extiende FragmentActivity, que es lo que react-native-biometrics necesita.
// ReactActivity ya hereda de FragmentActivity, por lo que a veces no es estrictamente necesario cambiar esto,
// pero si te da problemas o quieres asegurarte, esta es la forma explícita.
class MainActivity : FragmentActivity() { // ¡CAMBIO AQUÍ! Cambiado de ReactActivity a FragmentActivity

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "AwesomeWallet"

  // Necesitamos una referencia a la delegación de React Native para la creación de vistas.
  // La librería DefaultReactActivityDelegate no espera un FragmentActivity directamente
  // en su constructor, así que mantenemos la lógica de onCreate para inflar la vista.
  private val defaultReactActivityDelegate: ReactActivityDelegate by lazy {
    DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
  }

  // Sobrescribimos onCreate para asegurarnos de que la vista de React Native se inicialice correctamente
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    // Infla la vista raíz de React Native
    setContentView(defaultReactActivityDelegate.reactRootView)
  }

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  // Este método ya no es necesario aquí si inflamos la vista en onCreate.
  // Se mantiene si React Native lo espera de alguna forma en tu configuración específica.
  // Pero la clave es que la Actividad principal herede de FragmentActivity.
  // @Override
  // protected ReactActivityDelegate createReactActivityDelegate() {
  //   return new DefaultReactActivityDelegate(
  //       this,
  //       getMainComponentName(),
  //       fabricEnabled);
  // }
}