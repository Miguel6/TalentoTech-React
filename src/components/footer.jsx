import React from "react";
import { APP  } from './../models/constants.js';
import './../styles/footer.css'

export default function Footer() {
    return (
        <footer>
            <span>&copy; {APP.YEAR} - {APP.FOOTER_DESCRIPTION}</span>
        </footer>
    )
}
