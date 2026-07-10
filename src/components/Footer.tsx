import './Footer.css';

type FooterProps = {
    total: number,
    completed: number,
    pending: number
}

function Footer(props: FooterProps){
    return (
        <footer className='footer-container'>
            <div className='stat-box total'>
                <span className='stat-number'>{props.total}</span>
                <span className='stat-label'>Total</span>
            </div>
            <div className='stat-box pending'>
                <span className='stat-number'>{props.pending}</span>
                <span className='stat-label'>Pendiente</span>
            </div>
            <div className='stat-box completed'>
                <span className='stat-number'>{props.completed}</span>
                <span className='stat-label'>Completado</span>
            </div>
        </footer>
    );
}

export default Footer;