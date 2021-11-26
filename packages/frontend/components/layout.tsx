import { ReactNode } from 'react';
import Header from './header';
import Footer from './footer';

type Props = {
    children: ReactNode
}

const Layout = (props: Props) => {
    return (
        <div>
            <Header />
            <div>
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout;