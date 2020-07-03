interface DomOperation {
    css({ el, styles }: {
        el: {
            style: {
                [x: string]: any;
            };
        };
        styles: {
            [x: string]: any;
        };
    }): void;
    getStyleValue({ el, attr }: {
        el: HTMLElement;
        attr: string;
    }): string;
    insertCSS(css: string, options: {
        target?: any;
        prepend?: boolean;
    }): HTMLElement | undefined;
}
declare const dom: DomOperation;
export default dom;
