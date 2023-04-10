import React, {
    createContext,
    useState,
    useRef,
    useEffect,
    Children
} from "react";

type GreetProps = {
    name: string;
    messageCount: number;
    isLoggedIn: boolean;
};

export const Greet = (props: GreetProps) => {
    return (
        <div>
            <h2>Welcome {props.name} </h2>
        </div>
    );
};

type PersonListProps = {
    names: {
        first: string;
        last: string;
    }[];
};

export const PersonList = (props: PersonListProps) => {
    return (
        <div>
            {props.names.map((name) => {
                return (
                    <h2>
                        {name.first} {name.last}
                    </h2>
                );
            })}
        </div>
    );
};

type StatusProps = {
    status: "loading" | "success" | "error";
};

export const Status = (props: StatusProps) => {
    let message;
    if (props.status === "loading") {
        message = "Loading...";
    } else if (props.status === "success") {
        message = "Data fetched successf";
    } else if (props.status === "error") {
        message = "Error fetching data";
    }
    return (
        <div>
            <h2>Status - </h2>
        </div>
    );
};

type HeadingProps = {
    children: string;
};

export const Heading = (props: HeadingProps) => {
    return <h2>{props.children}</h2>;
};

type ButtonProps = {
    handleClick: (
        event: React.MouseEvent<HTMLButtonElement>,
        id: number
    ) => void;
};

export const Button = (props: ButtonProps) => {
    return (
        <button onClick={(event) => props.handleClick(event, 1)}>Click</button>
    );
};

type InputProps = {
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({ value, handleChange }: InputProps) => {
    return <input type="text" value={value} onChange={handleChange} />;
};

type ContainerProps = {
    styles: React.CSSProperties;
};

export const Container = (props: ContainerProps) => {
    return <div style={props.styles}>Text content goes here</div>;
};

export const LoggenIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    const handleLogout = () => {
        setIsLoggedIn(false);
    };
    return (
        <div>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
            <div>User is {isLoggedIn ? "logged in" : "logged out"}</div>
            <button></button>
        </div>
    );
};

type AuthUser = {
    name: string;
    email: string;
};

export const User = () => {
    const [user, setUser] = useState<AuthUser>({} as AuthUser);
    const handleLogin = () => {
        setUser({
            name: "aiko",
            email: "aiko@gmail.com"
        });
    };

    return (
        <div>
            <button onClick={handleLogin}>Login</button>

            <div>User name is {user.name}</div>
            <div>User email us {user.email}</div>
        </div>
    );
};

type CounterState = {
    count: number;
};

type UpdateAction = {
    type: "increment" | "decrement";
    payload: number;
};

type ResetAction = {
    type: "reset";
};

type CounterAction = UpdateAction | ResetAction;

const initialState = { count: 0 };

function reducer(state: CounterState, action: CounterAction) {
    switch (action.type) {
        case "increment":
            return { count: state.count + action.payload };
        case "decrement":
            return { count: state.count - action.payload };
        case "reset":
            return initialState;
        default:
            return state;
    }
}

type ThemeContextProvideProps = {
    children: React.ReactNode;
};

const ThemeContext = createContext(theme);

export const ThemeContextProvider = ({
    children
}: ThemeContextProvideProps) => {
    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};

type AuthUser1 = {
    name: string;
    email: string;
};

type UserContextType = {
    user: AuthUser | null;
    setUser: React.Dispatch<React.SetStateAction<AuthUser>>;
};

type UserContextProviderProps = {
    children: React.ReactNode;
};

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const User1 = () => {
    const [user, setUser] = useState<AuthUser>({} as AuthUser);
    const handleLogin = () => {};

    return (
        <div>
            <button onClick={handleLogin}>Login</button>

            <div>User name is {user.name}</div>
            <div>User email us {user.email}</div>
        </div>
    );
};

export const DomRef = () => {
    const inputRef = useRef<HTMLInputElement>(null!);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div>
            <input type="text" ref={inputRef} />
        </div>
    );
};

type PrivateProps = {
    isLoggedIn: boolean;
    Component: React.ComponentType;
};

export const Private = ({ isLoggedIn, Component }: PrivateProps) => {
    if (isLoggedIn) {
        return <Component />;
    } else {
        return <Login />;
    }
};

type ListProps<T> = {
    items: T[];
    onClick: (value: T) => void;
};

export const List = <T extends { id: number }>({
    items,
    onClick
}: ListProps<T>) => {
    return (
        <div>
            <h2>List of items</h2>
            {items.map((item, index) => {
                return (
                    <div key={index} onClick={() => onClick(item)}>
                        {item.id}
                    </div>
                );
            })}
        </div>
    );
};

type RandomNumberType = {
    value: number;
};

type PositiveNumber = RandomNumberType & {
    isPositive: boolean;
    isNegative?: never;
    isZero?: never;
};

type NegativeNumber = RandomNumberType & {
    isNegative: boolean;
    isPositive?: never;
    isZero?: never;
};

type Zero = RandomNumberType & {
    isZero: boolean;
    isNegative: never;
    isPositive?: never;
};

type RandomNumberProps = PositiveNumber | NegativeNumber | Zero;

export const RandomNumber = ({
    value,
    isPositive,
    isNegative,
    isZero
}: RandomNumberProps) => {
    return (
        <div>
            {value} {isPositive && "positive"} {isNegative && "negative"}{" "}
            {isZero && "zero"}
        </div>
    );
};

type HorizontalPosition = "left" | "center" | "right";
type VerticalPosition = "top" | "center" | "bottom";

type ToastProps = {
    position: `${HorizontalPosition}-${VerticalPosition}`;
};

export const Toast = ({ position }: ToastProps) => {
    return <div>Toast Notification Position = {position}</div>;
};

type ButtonProps3 = {
    variant: "primary" | "secondary";
    children: string;
} & Omit<React.ComponentProps<"button">, "children">;

export const CustomButton = ({ variant, children, ...rest }: ButtonProps3) => {
    return (
        <button className={`class-with-${variant}`} {...rest}>
            {children}
        </button>
    );
};

export const CustomComponent = (props: React.ComponentProps<typeof Greet>) => {
    return <div>{props.name}</div>;
};

type TextOwnProps<E extends React.ElementType> = {
    size?: "sm" | "md" | "lg";
    color?: "primary" | "secondary";
    children: React.ReactNode;
    as?: E;
};

type TextProps<E extends React.ElementType> = TextOwnProps<E> &
    Omit<React.ComponentProps<E>, keyof TextOwnProps<E>>;

export const Text = <E extends React.ElementType = "div">({
    size,
    color,
    children,
    as
}: TextProps<E>) => {
    const Component = as || "div";
    return (
        <Component className={`class-with${size}-${color}`}>
            {children}
        </Component>
    );
};

let greet = () => {
    console.log("hello, world");
};

const add = (a: number, b: number, c: number | string = 10) => {
    console.log(a + b);
    console.log(c);
};

add(5, 10, "20");

const minus = (a: number, b: number): number => {
    return a + b;
};
