export const Footer = ({author, appname}) => {
    
    const d = new Date();
    const year = d.getFullYear();

    return (
        <footer>
            <p>&copy; {year} all rights reserved.</p>
            <p>Created by {author}</p>   
        </footer>
    );
};

Footer.defaultProps = {
    author: 'Unknown'
}
