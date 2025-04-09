import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogType } from '@fluentui/react';
//eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Html5Qrcode: any;

interface IProps {
    value: string;
    onChange: (value: string) => void;
}

export const BarcodeScanner: React.FC<IProps> = (props) => {
    const [scanning, setScanning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [manualInput, setManualInput] = useState(props.value);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const scannerRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.8/html5-qrcode.min.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
            if (scannerRef.current) {
                scannerRef.current.stop().catch(console.error);
            }
        };
    }, []);

    useEffect(() => {
        setManualInput(props.value);
    }, [props.value]);

    useEffect(() => {
        return () => {
            if (scannerRef.current) {
                scannerRef.current.stop().catch(console.error);
            }
        };
    }, []);

    const handleDialogDismiss = () => {
        stopScanning();
        setIsDialogOpen(false);
    };

    const startScanning = async () => {
        try {
            setIsDialogOpen(true);
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (typeof Html5Qrcode === 'undefined') {
                throw new Error('MARS Barcode scanner failed to install');
            }

            const html5QrCode = new Html5Qrcode("reader");
            scannerRef.current = html5QrCode;

            const config = {
                fps: 15,
                qrbox: { width: 800, height: 400 },
                aspectRatio: 16/9,
                formatsToSupport: [
                    'CODE_39',
                    'CODE_128',
                    'EAN_13',
                    'EAN_8',
                    'UPC_A',
                    'UPC_E'
                ]
            };

            await html5QrCode.start(
                { facingMode: "environment" },
                config,
                (decodedText: string) => {
                    console.log("Barcode detected:", decodedText);
                    props.onChange(decodedText);
                    stopScanning();
                    setIsDialogOpen(false);
                },
                (errorMessage: string) => {
                    //console.log("Scanning error:", errorMessage);
                }
            );

            setScanning(true);
            setError(null);
        } catch (err) {
            console.error("Camera error:", err);
            setError('Failed to initialize camera. Please check camera permissions.');
            setIsDialogOpen(false);
        }
    };

    const stopScanning = async () => {
        if (scannerRef.current) {
            try {
                await scannerRef.current.stop();
                setScanning(false);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setManualInput(value);
        props.onChange(value);
    };

    return (
        <div className="barcode-scanner">
            <div className="manual-input">
                <input
                    type="text"
                    value={manualInput}
                    onChange={handleManualInput}
                    placeholder="Enter or scan barcode number"
                />
                <button onClick={startScanning} className="scan-button" title="Barkod Tara">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="scan-icon" fill="currentColor">
                        <path d="M2 4h4v2H4v2H2V4zm20 0v4h-2V6h-2V4h4zM4 16H2v4h4v-2H4v-2zm16 0v2h-2v2h4v-4h-2zM7 8h10v8H7V8z"/>
                    </svg>
                </button>
            </div>
    
            {error && <div className="error-message">{error}</div>}
    
            <Dialog
                hidden={!isDialogOpen}
                onDismiss={handleDialogDismiss}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'Barcode Scanning',
                    showCloseButton: true,
                    styles: {
                        content: { padding: 0 }
                    }
                }}
                modalProps={{
                    isBlocking: true,
                    isDarkOverlay: true,
                    styles: {
                        main: {
                            maxWidth: '90vw',
                            width: '90vw',
                            height: '90vh',
                            minHeight: '90vh',
                            background: '#000'
                        },
                        scrollableContent: {
                            height: '100%'
                        }
                    }
                }}
            >
                <div id="reader" ref={containerRef} style={{ 
                    width: '100%',
                    height: 'calc(90vh - 100px)',
                    border: 'none',
                    background: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}></div>
                
                <div className="dialog-footer" style={{ padding: '1rem' }}>
                    <button onClick={handleDialogDismiss} className="stop-button">
                        Taramayı Durdur
                    </button>
                </div>
            </Dialog>
        </div>
    );
};