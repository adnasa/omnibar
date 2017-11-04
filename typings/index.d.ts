declare namespace Omnibar {
  // Result set
  type ListResult<T> = Array<T>;
  type ResolvedResults<T> = Promise<ListResult<T>>;
  type Results<T> = ListResult<T> | ResolvedResults<T>;

  // Extensions
  type FunctionalExtension<T> = (query: string) => Results<T>;
  type Extension<T> = FunctionalExtension<T>;

  type GetStyleFunc<T> = <T>(context?: any) => React.CSSProperties;

  // Row contextual style getter
  interface GetRowStyleContext {
    isFocused: boolean;
    rowIndex: number;
  }
  type GetRowStyleFunc<T> = <T>(context?: any) => React.CSSProperties;

  interface Props<T> {
    // list of extensions
    extensions: Array<Omnibar.Extension<T>>;
    // max items
    maxResults?: number;
    // max items to display in view
    maxViewableResults?: number;
    // input placeholder text
    placeholder?: string;
    // input bar width
    width?: number;
    // input bar height
    height?: number;
    // result item height
    rowHeight?: number;
    // result renderering function
    resultRenderer?: <T>(item: T) => React.ReactChild;
    // action override
    onAction?: <T>(item: T) => void;
    // optional input delay override
    inputDelay?: number;
    // default value
    defaultValue?: string;

    // style getters
    getInputStyle?: Omnibar.GetStyleFunc<T>;
    getListStyle?: Omnibar.GetStyleFunc<T>;
    getRowStyle?: Omnibar.GetRowStyleFunc<T>;
    getWrapperStyle?: Omnibar.GetStyleFunc<T>;
  }

  interface State<T> {
    // list of matching results
    results: Array<T>;
    // current selected index (applies action upon key event)
    selectedIndex: number;
    // current mouse hovered index (applies action click event)
    hoveredIndex: number;
    // display results?
    displayResults: boolean;
  }
}

declare module 'omnibar' {
  export default class Omnibar<T> extends React.Component<
    Omnibar.Props<T>,
    Omnibar.State<T>
  > {}
  export function command<T>(
    extension: Omnibar.Extension<T>,
    command: string
  ): Omnibar.Extension<T>;
  export function withVoice<T>(Component: T): T;
}
