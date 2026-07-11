import './Header.css';

type HeaderProps = {
    onLogout: () => void;
};

function Header(props: HeaderProps) {
    return (
        <header className="main-header">
            <div className="header-info">
                <h1>Administrador de tareas</h1>
                <p>Mi primera aplicación con React</p>
            </div>
            <button className="logout-btn" onClick={props.onLogout}>
                Cerrar Sesión
            </button>
        </header>
    );
}

export default Header;