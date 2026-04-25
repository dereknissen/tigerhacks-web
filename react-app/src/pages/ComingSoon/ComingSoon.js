import Logo from '../../assets/logo/tigerhacks-color.png';

export default function ComingSoon() {
    return (
        <div style = {{backgroundColor: 'black', height: '100vh', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
            <img style = {{width: '200px'}} src = {Logo}></img>
            <h1 style = {{color: 'white'}}>Coming Soon</h1>
        </div>
    )
}