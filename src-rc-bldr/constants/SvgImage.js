import React from 'react';
import { View } from 'react-native';
import { Svg, Path, Circle, G, Rect, Line, Ellipse, LinearGradient, Defs, ClipPath, Image, Use, Pattern } from 'react-native-svg'

export const BackArrowImage = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="22.809" height="19.238" viewBox="0 0 22.809 19.238">
            <G transform="translate(22.809 0.311) rotate(90)">
                <Path d="M.5,21.309V0" transform="translate(8.808 0.75)" fill="none" stroke="#36363c" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" />
                <Path d="M17.116,0,8.559,8.594,0,0" transform="translate(0.75 13.464)" fill="none" stroke="#36363c" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" />
            </G>
        </Svg>
    )
}

export const SelectedAccount = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <Path d="M12.5 0.000549316C5.59716 0.000549316 0 5.59661 0 12.5C0 19.4034 5.59661 24.9995 12.5 24.9995C19.4039 24.9995 25 19.4034 25 12.5C25 5.59661 19.4039 0.000549316 12.5 0.000549316ZM12.5 3.73803C14.7841 3.73803 16.635 5.58948 16.635 7.87249C16.635 10.156 14.7841 12.0069 12.5 12.0069C10.217 12.0069 8.36609 10.156 8.36609 7.87249C8.36609 5.58948 10.217 3.73803 12.5 3.73803ZM12.4973 21.7314C10.2192 21.7314 8.13274 20.9018 6.52343 19.5286C6.1314 19.1942 5.90519 18.7039 5.90519 18.1894C5.90519 15.874 7.77914 14.0209 10.0951 14.0209H14.906C17.2225 14.0209 19.0893 15.874 19.0893 18.1894C19.0893 18.7044 18.8642 19.1936 18.4716 19.528C16.8629 20.9018 14.7759 21.7314 12.4973 21.7314Z" fill="#FF005A" />
        </Svg>
    )
}
export const UnSelectedAccount = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <G clip-path="url(#clip0_7_148)">
                <Path d="M12.5 0.000549316C5.59716 0.000549316 0 5.59661 0 12.5C0 19.4034 5.59661 24.9995 12.5 24.9995C19.4039 24.9995 25 19.4034 25 12.5C25 5.59661 19.4039 0.000549316 12.5 0.000549316ZM12.5 3.73803C14.7841 3.73803 16.635 5.58948 16.635 7.87249C16.635 10.156 14.7841 12.0069 12.5 12.0069C10.217 12.0069 8.36609 10.156 8.36609 7.87249C8.36609 5.58948 10.217 3.73803 12.5 3.73803ZM12.4973 21.7314C10.2192 21.7314 8.13274 20.9018 6.52343 19.5286C6.1314 19.1942 5.90519 18.7039 5.90519 18.1894C5.90519 15.874 7.77914 14.0209 10.0951 14.0209H14.906C17.2225 14.0209 19.0893 15.874 19.0893 18.1894C19.0893 18.7044 18.8642 19.1936 18.4716 19.528C16.8629 20.9018 14.7759 21.7314 12.4973 21.7314Z" fill="#808080" />
            </G>
            <Defs>
                <ClipPath id="clip0_7_148">
                    <Rect width="25" height="25" fill="white" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export const AboutUsIconSvg = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <Path d="M10 0C4.47301 0 0 4.4725 0 10C0 15.5269 4.4725 20 10 20C15.527 20 20 15.5275 20 10C20 4.47309 15.5275 0 10 0ZM10 18.6046C5.25539 18.6046 1.39535 14.7446 1.39535 10C1.39535 5.25535 5.25539 1.39535 10 1.39535C14.7446 1.39535 18.6046 5.25535 18.6046 10C18.6046 14.7446 14.7446 18.6046 10 18.6046Z" fill="#808080" />
            <Path d="M10.0002 8.33582C9.40789 8.33582 8.98668 8.58598 8.98668 8.95453V13.9696C8.98668 14.2855 9.40789 14.6014 10.0002 14.6014C10.5662 14.6014 11.0269 14.2855 11.0269 13.9696V8.95445C11.0269 8.58594 10.5662 8.33582 10.0002 8.33582Z" fill="#808080" />
            <Path d="M10.0002 5.2425C9.39473 5.2425 8.9209 5.67687 8.9209 6.17707C8.9209 6.6773 9.39477 7.12484 10.0002 7.12484C10.5926 7.12484 11.0665 6.6773 11.0665 6.17707C11.0665 5.67687 10.5925 5.2425 10.0002 5.2425Z" fill="#808080" />
        </Svg>
    )
}
export const LogoutIconSvg = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <G clip-path="url(#clip0_2_71)">
                <Path d="M14.1406 15.3125V16.875C14.1406 18.5982 12.7388 20 11.0156 20H3.16406C1.44089 20 0.0390625 18.5982 0.0390625 16.875V3.125C0.0390625 1.40182 1.44089 0 3.16406 0H11.0156C12.7388 0 14.1406 1.40182 14.1406 3.125V4.6875C14.1406 5.11902 13.7909 5.46875 13.3594 5.46875C12.9279 5.46875 12.5781 5.11902 12.5781 4.6875V3.125C12.5781 2.26349 11.8771 1.5625 11.0156 1.5625H3.16406C2.30255 1.5625 1.60156 2.26349 1.60156 3.125V16.875C1.60156 17.7365 2.30255 18.4375 3.16406 18.4375H11.0156C11.8771 18.4375 12.5781 17.7365 12.5781 16.875V15.3125C12.5781 14.881 12.9279 14.5312 13.3594 14.5312C13.7909 14.5312 14.1406 14.881 14.1406 15.3125ZM19.467 8.65799L17.7176 6.90857C17.4124 6.60339 16.9177 6.60339 16.6127 6.90857C16.3075 7.21359 16.3075 7.70828 16.6127 8.01331L17.8571 9.25781H8.47656C8.04504 9.25781 7.69531 9.60754 7.69531 10.0391C7.69531 10.4706 8.04504 10.8203 8.47656 10.8203H17.8571L16.6127 12.0648C16.3075 12.3698 16.3075 12.8645 16.6127 13.1696C16.7653 13.3221 16.9652 13.3984 17.1651 13.3984C17.3651 13.3984 17.565 13.3221 17.7176 13.1696L19.467 11.4201C20.2286 10.6586 20.2286 9.41956 19.467 8.65799V8.65799Z" fill="#808080" />
            </G>
            <Defs>
                <ClipPath id="clip0_2_71">
                    <Rect width="20" height="20" fill="white" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export const ContactUsSvg = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <G clip-path="url(#clip0_2_47)">
                <Path d="M19.6111 15.9032L17.3939 14.4249L15.4229 13.1112C15.0425 12.8581 14.5313 12.9411 14.2505 13.3015L13.0308 14.8694C12.7688 15.2097 12.2976 15.3074 11.9219 15.0994C11.0943 14.6391 10.1157 14.2057 7.95639 12.0436C5.79712 9.88156 5.36091 8.90572 4.90057 8.07815C4.69256 7.70245 4.79033 7.23117 5.13056 6.96922L6.69848 5.74958C7.0589 5.4688 7.14191 4.9576 6.88883 4.57717L5.6154 2.66684L4.09679 0.388902C3.83831 0.00117196 3.3209 -0.115233 2.92129 0.124413L1.16991 1.1751C0.696593 1.45397 0.348668 1.90427 0.198201 2.43267C-0.280739 4.17886 -0.3773 8.03088 5.79606 14.2042C11.9694 20.3776 15.8211 20.2807 17.5673 19.8018C18.0957 19.6513 18.546 19.3034 18.8249 18.8301L19.8755 17.0787C20.1152 16.6791 19.9988 16.1617 19.6111 15.9032Z" fill="#808080" />
                <Path d="M11.3791 3.10336C14.6151 3.10696 17.2375 5.72935 17.2411 8.96536C17.2411 9.15579 17.3955 9.3102 17.586 9.3102C17.7764 9.3102 17.9308 9.15583 17.9308 8.96536C17.9268 5.34865 14.9959 2.41771 11.3792 2.41372C11.1887 2.41372 11.0343 2.5681 11.0343 2.75856C11.0343 2.94895 11.1887 3.10336 11.3791 3.10336Z" fill="#808080" />
                <Path d="M11.3791 5.17228C13.473 5.17474 15.1697 6.87152 15.1722 8.96532C15.1722 9.15575 15.3265 9.31016 15.517 9.31016C15.7074 9.31016 15.8618 9.15579 15.8618 8.96532C15.859 6.49078 13.8537 4.48546 11.3791 4.4826C11.1887 4.4826 11.0343 4.63698 11.0343 4.82744C11.0343 5.01791 11.1887 5.17228 11.3791 5.17228Z" fill="#808080" />
                <Path d="M11.3791 7.24124C12.3309 7.24238 13.1021 8.01362 13.1032 8.96536C13.1032 9.15579 13.2576 9.3102 13.4481 9.3102C13.6385 9.3102 13.7929 9.15583 13.7929 8.96536C13.7914 7.63292 12.7116 6.55313 11.3792 6.5516C11.1887 6.5516 11.0343 6.70598 11.0343 6.89644C11.0343 7.08687 11.1887 7.24124 11.3791 7.24124Z" fill="#808080" />
            </G>
            <Defs>
                <ClipPath id="clip0_2_47">
                    <Rect width="20" height="20" fill="white" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export const MapSvg = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <Path d="M10 0.625C8.17664 0.625 6.42795 1.34933 5.13864 2.63864C3.84933 3.92795 3.125 5.67664 3.125 7.5C3.125 11.1312 9.25 18.8125 9.5125 19.1437C9.57106 19.2167 9.64527 19.2757 9.72965 19.3161C9.81402 19.3566 9.90642 19.3776 10 19.3776C10.0936 19.3776 10.186 19.3566 10.2704 19.3161C10.3547 19.2757 10.4289 19.2167 10.4875 19.1437C10.75 18.8125 16.875 11.1312 16.875 7.5C16.875 5.67664 16.1507 3.92795 14.8614 2.63864C13.572 1.34933 11.8234 0.625 10 0.625V0.625ZM10 9.375C9.50555 9.375 9.0222 9.22838 8.61107 8.95367C8.19995 8.67897 7.87952 8.28852 7.6903 7.83171C7.50108 7.37489 7.45157 6.87223 7.54804 6.38727C7.6445 5.90232 7.8826 5.45686 8.23223 5.10723C8.58186 4.7576 9.02732 4.5195 9.51227 4.42304C9.99723 4.32657 10.4999 4.37608 10.9567 4.5653C11.4135 4.75452 11.804 5.07495 12.0787 5.48607C12.3534 5.8972 12.5 6.38055 12.5 6.875C12.5 7.53804 12.2366 8.17393 11.7678 8.64277C11.2989 9.11161 10.663 9.375 10 9.375Z" fill="#808080" />
        </Svg>
    )
}

export const NotificationSvg = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <Path d="M16.0547 10.268V8.39844C16.0547 5.67102 14.2418 3.35934 11.7578 2.6043V1.75781C11.7578 0.788555 10.9693 0 10 0C9.03074 0 8.24219 0.788555 8.24219 1.75781V2.6043C5.7582 3.35934 3.94531 5.67098 3.94531 8.39844V10.268C3.94531 12.6638 3.03211 14.9355 1.37395 16.6648C1.21145 16.8342 1.16578 17.0843 1.25789 17.3002C1.35 17.5161 1.56211 17.6562 1.79687 17.6562H7.12926C7.40145 18.9919 8.5852 20 10 20C11.4148 20 12.5985 18.9919 12.8707 17.6562H18.2031C18.4379 17.6562 18.65 17.5161 18.7421 17.3002C18.8342 17.0843 18.7885 16.8342 18.6261 16.6648C16.9679 14.9355 16.0547 12.6638 16.0547 10.268V10.268ZM9.41406 1.75781C9.41406 1.43473 9.67691 1.17188 10 1.17188C10.3231 1.17188 10.5859 1.43473 10.5859 1.75781V2.37219C10.3931 2.35359 10.1977 2.34375 10 2.34375C9.80234 2.34375 9.60691 2.35359 9.41406 2.37219V1.75781ZM10 18.8281C9.23613 18.8281 8.58484 18.3382 8.34297 17.6562H11.657C11.4152 18.3382 10.7639 18.8281 10 18.8281V18.8281ZM3.05977 16.4844C4.39418 14.6956 5.11719 12.5309 5.11719 10.268V8.39844C5.11719 5.70605 7.30762 3.51562 10 3.51562C12.6924 3.51562 14.8828 5.70605 14.8828 8.39844V10.268C14.8828 12.5309 15.6058 14.6956 16.9403 16.4844H3.05977Z" fill="#808080" />
            <Path d="M17.6172 8.39844C17.6172 8.72204 17.8795 8.98438 18.2031 8.98438C18.5267 8.98438 18.7891 8.72204 18.7891 8.39844C18.7891 6.05079 17.8748 3.84364 16.2148 2.1836C15.986 1.95481 15.615 1.95477 15.3862 2.1836C15.1573 2.41243 15.1573 2.7834 15.3862 3.01223C16.8249 4.45094 17.6172 6.36379 17.6172 8.39844V8.39844Z" fill="#808080" />
            <Path d="M1.79688 8.98439C2.12047 8.98439 2.38281 8.72204 2.38281 8.39845C2.38281 6.36384 3.17516 4.45099 4.61383 3.01228C4.84266 2.78345 4.84266 2.41247 4.61383 2.18365C4.38504 1.95482 4.01402 1.95482 3.7852 2.18365C2.12516 3.84368 1.21094 6.05079 1.21094 8.39845C1.21094 8.72204 1.47328 8.98439 1.79688 8.98439V8.98439Z" fill="#808080" />
        </Svg>
    )
}

export const RateAppSvg = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <Path d="M4.47644 19.205C4.25732 19.205 4.03972 19.1366 3.85402 19.0023C3.50809 18.7516 3.3465 18.3207 3.44065 17.9049L4.7273 12.2372L0.363786 8.41046C0.0430379 8.13046 -0.0794933 7.68702 0.0521935 7.28128C0.18388 6.8763 0.542166 6.58958 0.966371 6.55037L6.73983 6.02622L9.02246 0.684434C9.19076 0.291968 9.57407 0.0385132 9.99996 0.0385132C10.4258 0.0385132 10.8092 0.291968 10.9775 0.683519L13.2601 6.02622L19.0326 6.55037C19.4578 6.58867 19.816 6.8763 19.9477 7.28128C20.0794 7.68626 19.9576 8.13046 19.6369 8.41046L15.2734 12.2364L16.56 17.904C16.6543 18.3207 16.4926 18.7516 16.1468 19.0016C15.8018 19.2515 15.3417 19.2707 14.9784 19.0524L9.99996 16.0773L5.0215 19.054C4.85319 19.154 4.66565 19.205 4.47644 19.205V19.205ZM9.99996 14.7957C10.1892 14.7957 10.3766 14.8465 10.545 14.9464L15.2435 17.7566L14.0291 12.4071C13.9425 12.0264 14.0717 11.6289 14.3659 11.3714L18.486 7.75798L13.035 7.26297C12.6425 7.22711 12.305 6.98037 12.1517 6.61873L9.99996 1.57771L7.84567 6.61949C7.69399 6.97869 7.35646 7.22543 6.96491 7.26129L1.51311 7.7563L5.63309 11.3697C5.9282 11.628 6.05729 12.0248 5.96986 12.4064L4.75645 17.7556L9.4549 14.9464C9.62321 14.8465 9.81074 14.7957 9.99996 14.7957V14.7957ZM6.69574 6.12952C6.69574 6.12952 6.69574 6.13044 6.69482 6.1312L6.69574 6.12952ZM13.3025 6.12708L13.3034 6.12876C13.3034 6.12784 13.3034 6.12784 13.3025 6.12708Z" fill="#808080" />
        </Svg>
    )
}

export const ShareSvg = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <Path d="M15.8594 12.9688C14.7015 12.9688 13.6812 13.5383 13.0404 14.4045L7.49961 11.5673C7.5916 11.2538 7.65625 10.9288 7.65625 10.5859C7.65625 10.1209 7.5609 9.67871 7.39617 9.27203L13.1948 5.78266C13.8401 6.54 14.7886 7.03125 15.8594 7.03125C17.798 7.03125 19.375 5.45426 19.375 3.51562C19.375 1.57699 17.798 0 15.8594 0C13.9207 0 12.3438 1.57699 12.3438 3.51562C12.3438 3.96238 12.4357 4.38617 12.5884 4.77961L6.77246 8.27922C6.1277 7.54437 5.19285 7.07031 4.14062 7.07031C2.20199 7.07031 0.625 8.6473 0.625 10.5859C0.625 12.5246 2.20199 14.1016 4.14062 14.1016C5.31758 14.1016 6.35512 13.5153 6.99355 12.6248L12.5161 15.4527C12.4143 15.7811 12.3438 16.123 12.3438 16.4844C12.3438 18.423 13.9207 20 15.8594 20C17.798 20 19.375 18.423 19.375 16.4844C19.375 14.5457 17.798 12.9688 15.8594 12.9688Z" fill="#808080" />
        </Svg>
    )
}
export const UnFavSvg = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <Path d="M18.5408 2.90117C17.5543 1.78187 16.1859 1.16547 14.6875 1.16547C12.5802 1.16547 11.246 2.42406 10.4979 3.47992C10.3037 3.7539 10.1386 4.02863 10 4.28715C9.86137 4.02863 9.69629 3.7539 9.50215 3.47992C8.75402 2.42406 7.41984 1.16547 5.3125 1.16547C3.81414 1.16547 2.44566 1.78191 1.45918 2.90121C0.518242 3.96894 0 5.39894 0 6.92777C0 8.59195 0.649727 10.1398 2.04473 11.7989C3.29148 13.2817 5.08512 14.8101 7.16211 16.58C7.93605 17.2395 8.73641 17.9216 9.58848 18.6671L9.61406 18.6895C9.72453 18.7862 9.86227 18.8345 10 18.8345C10.1377 18.8345 10.2755 18.7862 10.3859 18.6895L10.4115 18.6671C11.2636 17.9216 12.0639 17.2396 12.838 16.5799C14.9149 14.8102 16.7085 13.2817 17.9553 11.7989C19.3503 10.1398 20 8.59195 20 6.92777C20 5.39894 19.4818 3.96894 18.5408 2.90117ZM12.0779 15.688C11.4107 16.2566 10.724 16.8417 10 17.4711C9.27602 16.8418 8.58934 16.2566 7.92203 15.688C3.85723 12.2242 1.17188 9.93586 1.17188 6.92777C1.17188 5.68441 1.58613 4.52957 2.33836 3.67601C3.09922 2.81277 4.15543 2.33734 5.3125 2.33734C6.9191 2.33734 7.95766 3.32711 8.54594 4.15742C9.07363 4.90211 9.34898 5.65281 9.44289 5.94097C9.52145 6.18219 9.74633 6.34543 10 6.34543C10.2537 6.34543 10.4786 6.18219 10.5571 5.94097C10.651 5.65281 10.9264 4.90211 11.4541 4.15738C12.0423 3.32711 13.0809 2.33734 14.6875 2.33734C15.8446 2.33734 16.9008 2.81277 17.6616 3.67601C18.4139 4.52957 18.8281 5.68441 18.8281 6.92777C18.8281 9.93586 16.1428 12.2242 12.0779 15.688Z" fill="#FF005A" />
        </Svg>
    )
}
export const NotificationHomeSvg = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
            <Path d="M16.6302 21.7563C16.6302 22.8699 16.0365 23.7222 15.0723 24.2793C14.1084 24.8361 12.9207 24.8361 11.9586 24.2793C10.9941 23.7222 10.4007 22.8699 10.4007 21.7563" fill="white" />
            <Path d="M13.5147 2.3124C14.3643 2.3124 15.0486 2.8362 15.0486 3.6417C15.0486 4.1487 15.0663 4.527 15.3849 4.6239C18.0942 5.442 19.8315 7.3596 19.8315 9.8499V14.0355C19.8315 15.9531 20.616 16.3413 21.6033 17.0748C23.0331 18.1353 22.7067 20.3436 21.066 20.3421H5.964C4.3233 20.3436 3.9969 18.1353 5.4267 17.0748C6.4128 16.3413 7.1985 15.9531 7.1985 14.0355V9.8499C7.1985 7.3596 8.9358 5.442 11.6451 4.6239C11.9628 4.527 11.9814 4.1487 11.9814 3.6417C11.9817 2.8362 12.6663 2.3124 13.5147 2.3124V2.3124Z" fill="white" />
        </Svg>
    )
}
export const EditIconSvg = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
            <G clip-path="url(#clip0_5_140)">
                <Path d="M16.6739 4.53492L1.81816 19.3918C1.74342 19.4667 1.68946 19.5614 1.66376 19.6631L0.017136 26.2723C-0.0321192 26.4712 0.0263446 26.6828 0.17154 26.828C0.281401 26.9379 0.431093 26.9987 0.584213 26.9987C0.631112 26.9987 0.679082 26.9929 0.725768 26.9811L7.33495 25.3343C7.43796 25.3086 7.53155 25.2549 7.60629 25.1801L22.4634 10.3243L16.6739 4.53492Z" fill="white" />
                <Path d="M26.1438 2.50925L24.4901 0.855558C23.3849 -0.249685 21.4585 -0.248614 20.3546 0.855558L18.3289 2.88123L24.1181 8.67042L26.1438 6.64475C26.6959 6.09288 27 5.35834 27 4.57711C27 3.79588 26.6959 3.06133 26.1438 2.50925Z" fill="white" />
            </G>
            <Defs>
                <ClipPath id="clip0_5_140">
                    <Rect width="27" height="27" fill="white" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export const TermsUseSvg = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <Path d="M8.125 9.375H4.6875C4.60462 9.375 4.52513 9.34208 4.46653 9.28347C4.40792 9.22487 4.375 9.14538 4.375 9.0625C4.375 8.97962 4.40792 8.90013 4.46653 8.84153C4.52513 8.78292 4.60462 8.75 4.6875 8.75H8.125C8.20788 8.75 8.28737 8.78292 8.34597 8.84153C8.40458 8.90013 8.4375 8.97962 8.4375 9.0625C8.4375 9.14538 8.40458 9.22487 8.34597 9.28347C8.28737 9.34208 8.20788 9.375 8.125 9.375Z" fill="#808080" />
            <Path d="M4.6875 7.1875H12.8125C12.8954 7.1875 12.9749 7.22042 13.0335 7.27903C13.0921 7.33763 13.125 7.41712 13.125 7.5C13.125 7.58288 13.0921 7.66237 13.0335 7.72097C12.9749 7.77958 12.8954 7.8125 12.8125 7.8125H4.6875C4.60462 7.8125 4.52513 7.77958 4.46653 7.72097C4.40792 7.66237 4.375 7.58288 4.375 7.5C4.375 7.41712 4.40792 7.33763 4.46653 7.27903C4.52513 7.22042 4.60462 7.1875 4.6875 7.1875V7.1875Z" fill="#808080" />
            <Path d="M4.6875 5.625H12.8125C12.8954 5.625 12.9749 5.65792 13.0335 5.71653C13.0921 5.77513 13.125 5.85462 13.125 5.9375C13.125 6.02038 13.0921 6.09987 13.0335 6.15847C12.9749 6.21708 12.8954 6.25 12.8125 6.25H4.6875C4.60462 6.25 4.52513 6.21708 4.46653 6.15847C4.40792 6.09987 4.375 6.02038 4.375 5.9375C4.375 5.85462 4.40792 5.77513 4.46653 5.71653C4.52513 5.65792 4.60462 5.625 4.6875 5.625V5.625Z" fill="#808080" />
            <Path d="M4.6875 4.0625H12.8125C12.8954 4.0625 12.9749 4.09542 13.0335 4.15403C13.0921 4.21263 13.125 4.29212 13.125 4.375C13.125 4.45788 13.0921 4.53737 13.0335 4.59597C12.9749 4.65458 12.8954 4.6875 12.8125 4.6875H4.6875C4.60462 4.6875 4.52513 4.65458 4.46653 4.59597C4.40792 4.53737 4.375 4.45788 4.375 4.375C4.375 4.29212 4.40792 4.21263 4.46653 4.15403C4.52513 4.09542 4.60462 4.0625 4.6875 4.0625V4.0625Z" fill="#808080" />
            <Path d="M17.45 9.06563L17.2375 9.28125L17.0125 9.05625L17.2094 8.85938C17.4704 8.59927 17.6234 8.25011 17.6377 7.88192C17.652 7.51373 17.5265 7.15375 17.2865 6.87419C17.0465 6.59462 16.7096 6.41615 16.3435 6.37457C15.9774 6.33299 15.6091 6.43138 15.3125 6.65V2.5C15.3118 2.25159 15.2127 2.01356 15.0371 1.83791C14.8614 1.66225 14.6234 1.56324 14.375 1.5625H3.125C2.87659 1.56324 2.63856 1.66225 2.46291 1.83791C2.28725 2.01356 2.18824 2.25159 2.1875 2.5V17.5C2.18824 17.7484 2.28725 17.9864 2.46291 18.1621C2.63856 18.3377 2.87659 18.4368 3.125 18.4375H14.375C14.6234 18.4368 14.8614 18.3377 15.0371 18.1621C15.2127 17.9864 15.3118 17.7484 15.3125 17.5V12.0906L17.8937 9.50938C17.9526 9.45053 17.9857 9.37072 17.9857 9.2875C17.9857 9.20428 17.9526 9.12447 17.8937 9.06563C17.8349 9.00678 17.7551 8.97372 17.6719 8.97372C17.5887 8.97372 17.5088 9.00678 17.45 9.06563V9.06563ZM14.6875 11.8313L14.3219 12.1969C14.2687 12.2494 14.2363 12.3193 14.2306 12.3937C14.2248 12.4682 14.2461 12.5423 14.2906 12.6023C14.335 12.6623 14.3996 12.7043 14.4726 12.7205C14.5455 12.7368 14.6218 12.7261 14.6875 12.6906V17.5C14.6875 17.5829 14.6546 17.6624 14.596 17.721C14.5374 17.7796 14.4579 17.8125 14.375 17.8125H3.125C3.04212 17.8125 2.96263 17.7796 2.90403 17.721C2.84542 17.6624 2.8125 17.5829 2.8125 17.5V2.5C2.8125 2.41712 2.84542 2.33763 2.90403 2.27903C2.96263 2.22042 3.04212 2.1875 3.125 2.1875H14.375C14.4579 2.1875 14.5374 2.22042 14.596 2.27903C14.6546 2.33763 14.6875 2.41712 14.6875 2.5V7.25C13.375 8.5625 8.8375 13.1 8.83438 13.1062C8.74594 13.1947 8.68187 13.24 8.65937 13.3594C8.65187 13.3906 8.23438 15.2925 8.23438 15.325L7.91875 15.6406C7.85991 15.6995 7.82685 15.7793 7.82685 15.8625C7.82685 15.9457 7.85991 16.0255 7.91875 16.0844C7.97759 16.1432 8.05741 16.1763 8.14062 16.1763C8.22384 16.1763 8.30366 16.1432 8.3625 16.0844L8.68125 15.7656C8.72969 15.7656 10.5978 15.3547 10.6438 15.3437C10.7859 15.3103 10.7972 15.2747 10.9 15.1719L14.6875 11.3812V11.8313ZM9.10937 13.8937L10.1094 14.8937C9.07625 15.1228 9.66813 14.9928 8.83125 15.1719C9.00406 14.3634 8.9375 14.6691 9.10937 13.8937V13.8937ZM10.6969 14.4938L9.5125 13.3094C9.60938 13.2075 14.0188 8.79969 14.1188 8.7L15.3031 9.88437C15.1294 10.0572 10.8437 14.3391 10.6969 14.4938ZM15.3125 11.2063V10.7562C16.3625 9.70625 16.0878 9.98031 16.5719 9.5L16.7969 9.72188L15.3125 11.2063ZM16.7656 8.41875C16.2419 8.9425 16.4706 8.71312 15.7469 9.44062H15.7438L14.5656 8.25938C14.7472 8.07344 14.5706 8.25094 15.5844 7.2375C15.7416 7.08346 15.9532 6.99768 16.1733 6.99879C16.3933 6.9999 16.6041 7.08782 16.7597 7.24344C16.9153 7.39905 17.0032 7.6098 17.0043 7.82987C17.0054 8.04995 16.9197 8.26157 16.7656 8.41875V8.41875Z" fill="#808080" />
        </Svg>
    )
}