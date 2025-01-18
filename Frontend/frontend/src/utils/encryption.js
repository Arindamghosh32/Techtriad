import forge from 'node-forge';

export class ChatEncryption {
    constructor() {
        // Generate RSA key pair
        this.keyPair = this.generateKeyPair();
    }

    // Generate a public-private key pair
    generateKeyPair() {
        const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
        return {
            privateKey: keyPair.privateKey, // Private Key for decryption
            publicKey: keyPair.publicKey   // Public Key for encryption
        };
    }

    // Encrypt a message using the recipient's public key
    encryptMessage(message, recipientPublicKeyPem) {
        try {
            // Convert recipient's public key PEM to a forge public key object
            const recipientPublicKey = forge.pki.publicKeyFromPem(recipientPublicKeyPem);

            // Encrypt the message using recipient's public key
            const encryptedMessage = recipientPublicKey.encrypt(message, 'RSA-OAEP');

            return forge.util.encode64(encryptedMessage); // Return as Base64 for easy transmission
        } catch (error) {
            console.error('Encryption failed:', error);
            return null;
        }
    }

    // Decrypt a message using the private key
    decryptMessage(encryptedMessageBase64) {
        try {
            // Decode the Base64 encrypted message to binary
            const encryptedMessage = forge.util.decode64(encryptedMessageBase64);

            // Decrypt the message using the private key
            const decryptedMessage = this.keyPair.privateKey.decrypt(encryptedMessage, 'RSA-OAEP');

            return decryptedMessage; // Return decrypted plaintext
        } catch (error) {
            console.error('Decryption failed:', error);
            return null;
        }
    }

    // Get the public key in PEM format
    getPublicKeyPem() {
        return forge.pki.publicKeyToPem(this.keyPair.publicKey);
    }
}
