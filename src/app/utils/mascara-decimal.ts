import {
    Directive,
    ElementRef,
    HostListener,
    forwardRef,
    Renderer2
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

@Directive({
    selector: '[appMascaraDecimal]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MascaraDecimalDirective),
            multi: true
        }
    ]
})
export class MascaraDecimalDirective implements ControlValueAccessor {

    private valor = 0;

    private onChange: (value: number) => void = () => { };
    private onTouched: () => void = () => { };

    constructor(
        private elementRef: ElementRef<HTMLInputElement>,
        private renderer: Renderer2
    ) { }

    /**
     * Chamado pelo Angular quando o valor do ngModel muda.
     */
    writeValue(value: number | null): void {
        this.valor = this.sanitizarValor(value);
        this.atualizarInput();
    }

    registerOnChange(fn: (value: number) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(disabled: boolean): void {
        this.renderer.setProperty(
            this.elementRef.nativeElement,
            'disabled',
            disabled
        );
    }

    @HostListener('input', ['$event'])
    onInput(event: Event): void {
        const input = event.target as HTMLInputElement;

        // Remove tudo que não for número
        const numeros = input.value.replace(/\D/g, '');

        // Se apagou tudo
        if (!numeros) {
            this.valor = 0;
        } else {
            // Os números digitados representam centavos
            this.valor = Number(numeros);
        }

        // Nunca permite negativo
        this.valor = Math.max(0, this.valor);

        // Atualiza o ngModel
        this.onChange(this.valor);

        // Mantém o formato visual
        this.atualizarInput();

        // Coloca o cursor no final
        this.posicionarCursor();
    }

    @HostListener('blur')
    onBlur(): void {
        this.atualizarInput();
        this.onTouched();
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        // Permite teclas de controle
        const teclasPermitidas = [
            'Backspace',
            'Delete',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'Home',
            'End'
        ];

        if (teclasPermitidas.includes(event.key)) {
            return;
        }

        // Permite somente números
        if (!/^\d$/.test(event.key)) {
            event.preventDefault();
        }
    }

    private sanitizarValor(value: number | null): number {
        if (value == null || !Number.isFinite(value)) {
            return 0;
        }

        return Math.max(0, Math.trunc(value));
    }

    private atualizarInput(): void {
        this.renderer.setProperty(
            this.elementRef.nativeElement,
            'value',
            this.formatar(this.valor)
        );
    }

    private formatar(valor: number): string {
        return (valor / 100)
            .toFixed(2)
            .replace('.', ',');
    }

    private posicionarCursor(): void {
        const input = this.elementRef.nativeElement;

        requestAnimationFrame(() => {
            const posicao = input.value.length;

            input.setSelectionRange(posicao, posicao);
        });
    }
}
