import clsx from "clsx";
import React from "react";
import ProfileForm from "./profile-form";
import ProfileMenu from "./profile-menu";
import styles from "./profile-page.module.css"


const ProfilePage = () => {


    return (
        <>
            <section className={clsx(styles.wrap)}>
                <ProfileMenu/>
               <ProfileForm/>
            </section>
        </>
    );
};

export default ProfilePage;
