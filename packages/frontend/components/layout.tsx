import Header from './header';


type Props = {
    children: ReacNode
}

const Layout = (props: Props) => {
    return (
        <div>
            <Header />
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default Layout;