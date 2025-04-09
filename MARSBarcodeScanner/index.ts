import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BarcodeScanner } from "./components/BarcodeScanner";

export class MARSBarcodeScanner implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container: HTMLDivElement;
    private _value: string;
    private _notifyOutputChanged: () => void;

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this._notifyOutputChanged = notifyOutputChanged;
        this._container = container;

        this._value = context.parameters.value.raw || "";

        this.renderControl(context);
    }

    private renderControl(context: ComponentFramework.Context<IInputs>): void {
        ReactDOM.render(
            React.createElement(BarcodeScanner, {
                value: this._value,
                onChange: this.onChange.bind(this)
            }),
            this._container
        );
    }

    private onChange(value: string): void {
        this._value = value;
        this._notifyOutputChanged();
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.renderControl(context);
    }

    public getOutputs(): IOutputs {
        const outputs: IOutputs = {
            value: this._value
        };
        return outputs;
    }

    public destroy(): void {
        ReactDOM.unmountComponentAtNode(this._container);
    }
}