# MARS Barcode Scanner PCF Component for Dynamics CRM

A Power Apps Component Framework (PCF) component that enables barcode scanning functionality within Dynamics CRM forms. This component allows users to scan barcodes using their device camera or enter barcode values manually.


## Features

- Camera-based barcode scanning
- Manual barcode entry option
- Supports multiple barcode formats
- Mobile-friendly interface
- Simple integration with Dynamics CRM forms

## Supported Barcode Formats

The component supports the following barcode formats:
- CODE_39
- CODE_128
- EAN_13
- EAN_8
- UPC_A
- UPC_E
- QR Code

## Prerequisites

- Power Platform CLI
- Node.js
- A Dynamics 365 environment with administrator access

## Usage

You can import the pre-built PCF package directly from:
Solutions/bin/Release/MARS.QRAndBarcodeScanner.Pcf.zip (unmanaged)

![sample (1)](https://github.com/user-attachments/assets/62578d88-e06f-4efd-85cb-cb44b40af2eb)


1. Add the Barcode Scanner control to a text field in your entity form
2. Configure the properties as needed
3. Save and publish the form
4. Users can now scan barcodes by clicking the scan button or manually enter values

![SelectComponent](https://github.com/user-attachments/assets/45c8bed1-05e7-4040-af7e-5d6723487a13)


## Implementation Details

The component integrates the HTML5-QRCode library to provide browser-based barcode scanning capabilities. It uses the device camera to detect and decode barcodes, then populates the associated field with the scanned value.

The scanner opens in a modal dialog when activated and automatically closes after successful scanning.

## Configuration Options

When adding the component to a form, you can configure:
- Field binding (which field will receive the scanned value)
- Default camera (front or back)
- Scan button text and styling

## Troubleshooting

Common issues:
- **Camera not working**: Make sure the site has camera permissions in your browser
- **Scanning not detecting barcodes**: Ensure adequate lighting and that the barcode is clearly visible
- **Component not loading**: Check if all dependencies are correctly loaded

## Contributors

Special thanks to the following contributors who helped make this project possible:

- [Ömer Faruk DÖNMEZ](www.linkedin.com/in/ömer-faruk-dönmez-499622176)
- [Veysel BAYSAL](https://www.linkedin.com/in/veysel-baysal-977b61127)
- [Yasemin ALTUN](https://www.linkedin.com/in/yasemin-altun-608824226)
- [Nursena PELİN İLTER](https://www.linkedin.com/in/nursena-pelin-ilter-a97893140)

## License

[MIT](LICENSE)

## Support

For questions, issues, or feature requests, please open an issue on the GitHub repository.
