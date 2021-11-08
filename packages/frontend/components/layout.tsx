import { ReactNode } from 'react';
import Header from './header';

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
        </div>
    )
}

export default Layout;