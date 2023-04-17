import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Data = {
    $$type: 'Data';
    minAmount: bigint;
    maxAmount: bigint;
}

export function storeData(src: Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.minAmount, 257);
        b_0.storeInt(src.maxAmount, 257);
    };
}

export function loadData(slice: Slice) {
    let sc_0 = slice;
    let _minAmount = sc_0.loadIntBig(257);
    let _maxAmount = sc_0.loadIntBig(257);
    return { $$type: 'Data' as const, minAmount: _minAmount, maxAmount: _maxAmount };
}

function loadTupleData(source: TupleReader) {
    let _minAmount = source.readBigNumber();
    let _maxAmount = source.readBigNumber();
    return { $$type: 'Data' as const, minAmount: _minAmount, maxAmount: _maxAmount };
}

function storeTupleData(source: Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.minAmount);
    builder.writeNumber(source.maxAmount);
    return builder.build();
}

function dictValueParserData(): DictionaryValue<Data> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeData(src)).endCell());
        },
        parse: (src) => {
            return loadData(src.loadRef().beginParse());
        }
    }
}

 type SlotsContract_init_args = {
    $$type: 'SlotsContract_init_args';
    owner: Address;
}

function initSlotsContract_init_args(src: SlotsContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function SlotsContract_init(owner: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initSlotsContract_init_args({ $$type: 'SlotsContract_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const SlotsContract_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    8124: { message: `too small bet` },
    24690: { message: `too large bet` },
    49280: { message: `not owner` },
}

export class SlotsContract implements Contract {
    
    static async init(owner: Address) {
        return await SlotsContract_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await SlotsContract_init(owner);
        const address = contractAddress(0, init);
        return new SlotsContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new SlotsContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: SlotsContract_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'withdraw' | null) {
        
        let body: Cell | null = null;
        if (message === 'withdraw') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_data', builder.build())).stack;
        const result = loadTupleData(source);
        return result;
    }
    
}