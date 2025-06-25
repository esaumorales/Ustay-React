import PropertyHeader from '../components/PropertyHeader';
import ListPromotion from '../components/promotion/ListPromotion';

export default function PromotionContent() {
    return (
        <div>
            <div>
                <PropertyHeader
                    title="Promociones"
                    descripcion="Administra tus inmuebles, ya sean cuartos o departamentos, registrándolos, editándolos o eliminándolos fácilmente. Mantén tu catálogo actualizado para gestionar mejor tus espacios en alquiler."
                />
            </div>
            <ListPromotion />
        </div>
    );
}