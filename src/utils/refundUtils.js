import QRious from 'qrious';

export const createRefundQr = (
  currency,
  privateKey,
  redeemScript,
  timeoutBlockHeight
) => {
  const jsonData = JSON.stringify({
    currency,
    privateKey,
    redeemScript,
    timeoutBlockHeight,
  });

  const qr = new QRious({
    size: 500,
    level: 'L',
    value: jsonData,
    background: 'white',
    foreground: 'black',
    backgroundAlpha: 1,
    foregroundAlpha: 1,
  });

  return qr.toDataURL();
};
