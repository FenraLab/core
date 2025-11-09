export type TReturn = void | Promise<void>
export type TNext<TError = any> = (err?: TError) => TReturn
export type TFunction<TArguments extends any[], TError = any> = (...args: [...TArguments, TNext<TError>]) => TReturn
export type TMethod<TBaseclass, TArguments extends any[], TError = any> = TFunction<[TBaseclass, ...TArguments], TError>

export function emptynext<TError = any> (error?: TError){}

export class Manager<
    TArguments extends any[],
    TError = any
> {
    public array: Array<TFunction<TArguments, TError>> = [];

    use(...mw: TFunction<TArguments, TError>[]) {
        this.array.push(...mw);
    }

    async dispatch(...args: TArguments) {
        await invoke(this.array, ...args);
    }

}

export async function invoke<
    TArguments extends any[] = [],
    TError = any,
>(middlewares: TFunction<TArguments, TError>[], ...args: TArguments): Promise<void> {
    if (!middlewares.length) return;

    const mw = middlewares[0];
    return mw(...args, async (error?: TError) => { 
        if (!error) return await invoke(middlewares.slice(1), ...args) ;
    })

}