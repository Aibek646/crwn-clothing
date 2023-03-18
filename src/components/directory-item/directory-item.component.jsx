import { useNavigate } from "react-router";
import {
    BackgroundImage,
    Body,
    DirectoryItemContainer
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
    const { imageUrl, title, route } = category;

    const navigate = useNavigate();

    const onHandleNavigate = () => navigate(route);

    return (
        <DirectoryItemContainer onClick={onHandleNavigate}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;
