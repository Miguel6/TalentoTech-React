import ProductList from "./product-list.jsx";
import {Helmet} from "react-helmet";

export default function Products() {
    return(
        <>
            <Helmet>
                <title>Productos | Aura Animal</title>
                <meta name="description" content="Descubrí nuestros productos para perros, gatos y más." />
            </Helmet>
            <ProductList showAdminControls={false} />
        </>
    )
}
