const Redis = require("ioredis");

// --------------------- Conexión a Valkey (lazy loading) ---------------------
let valkeyClient = null;

/**
 * Obtiene una instancia del cliente de Valkey
 * Usa lazy loading para conectar solo cuando sea necesario
 * @returns {Promise<Redis>} Cliente de Valkey/Redis
 */
async function getValkeyClient() {
  if (!valkeyClient) {
    try {
      valkeyClient = new Redis({
        host: process.env.VALKEY_HOST,
        port: Number(process.env.VALKEY_PORT),
        password: process.env.VALKEY_PASSWORD || undefined,
        connectTimeout: 5000,
        lazyConnect: true,
        retryDelayOnFailover: 100,
        maxRetriesPerRequest: 3
      });
      
      // Configurar eventos de conexión
      valkeyClient.on('connect', () => {
        console.log('✅ Conectado a Valkey');
      });
      
      valkeyClient.on('error', (error) => {
        console.error('❌ Error de conexión a Valkey:', error);
      });
      
      valkeyClient.on('close', () => {
        console.log('🔌 Conexión a Valkey cerrada');
      });
      
      // Conectar de forma lazy
      await valkeyClient.connect();
      
    } catch (error) {
      console.error('❌ Error conectando a Valkey:', error);
      valkeyClient = null; // Reset para permitir reintentos
      throw error;
    }
  }
  return valkeyClient;
}

/**
 * Cierra la conexión a Valkey
 * Útil para cleanup en shutdown de la aplicación
 */
async function closeValkeyConnection() {
  if (valkeyClient) {
    await valkeyClient.quit();
    valkeyClient = null;
    console.log('🔒 Conexión a Valkey cerrada correctamente');
  }
}

/**
 * Verifica si la conexión a Valkey está activa
 * @returns {boolean} True si está conectado
 */
function isValkeyConnected() {
  return valkeyClient && valkeyClient.status === 'ready';
}

module.exports = {
  getValkeyClient,
  closeValkeyConnection,
  isValkeyConnected
};
