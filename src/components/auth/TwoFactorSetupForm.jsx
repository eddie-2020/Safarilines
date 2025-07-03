import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import styles from './TwoFactorSetupForm.module.css';
import useTwoFactor from '../../../hooks/useTwoFactor';

const TwoFactorSetupForm = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('');
  const { isLoading, qrCodeData, backupCodes, setup2FA, confirm2FASetup } = useTwoFactor();

  useEffect(() => {
    if (step === 1) {
      setup2FA();
    }
  }, [step]);

  const handleVerify = async (e) => {
    e.preventDefault();
    await confirm2FASetup(code);
    setStep(2);
  };

  return (
    <div className={styles.container}>
      {step === 1 && (
        <>
          <h2>Set Up Two-Factor Authentication</h2>
          <div className={styles.qrContainer}>
            <QRCode value={qrCodeData?.uri} size={200} />
            <div className={styles.secretContainer}>
              <p>Secret Key: <code>{qrCodeData?.secret}</code></p>
            </div>
          </div>
          <form onSubmit={handleVerify} className={styles.form}>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 6-digit code"
              maxLength={6}
              required
            />
            <button type="submit" disabled={isLoading}>
              Verify & Enable
            </button>
          </form>
        </>
      )}
      
      {step === 2 && (
        <>
          <h2>Backup Codes</h2>
          <div className={styles.backupCodes}>
            {backupCodes.map((code, i) => (
              <div key={i} className={styles.codeItem}>{code}</div>
            ))}
          </div>
          <button onClick={onComplete} className={styles.completeButton}>
            Finish Setup
          </button>
        </>
      )}
    </div>
  );
};

export default TwoFactorSetupForm;