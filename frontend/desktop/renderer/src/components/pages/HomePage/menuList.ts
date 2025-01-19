import { RoutePath } from "@/public/navigation/routePath";
import { MenuItemProps } from "./MenuItem";

export enum AccessType {
    forAnonymous,
    forAuth,
    forAll,
}

type MenuItem = MenuItemProps & {
    accessType: AccessType;
};

export const menuList: MenuItem[] = [
    {
        label: "Вход",
        href: RoutePath.signIn,
        accessType: AccessType.forAnonymous,
    },
    {
        label: "Регистрация",
        href: RoutePath.signUp,
        accessType: AccessType.forAnonymous,
    },
    {
        label: "Список уровней",
        href: RoutePath.levelList,
        accessType: AccessType.forAuth,
    },
    {
        label: "Редактор уровня",
        href: RoutePath.editor,
        accessType: AccessType.forAuth,
    },
    {
        label: "Профиль",
        href: RoutePath.profile,
        accessType: AccessType.forAuth,
    },
    {
        label: "Выход",
        accessType: AccessType.forAll,
        onClick: (event) => {
            event.preventDefault();
            window.commonAPI.quitApp();
        },
        color: "error",
    },
];
