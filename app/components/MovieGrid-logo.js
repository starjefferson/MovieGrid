import Image from "next/image"
export default function Logo () {
    return (
        <div>
        <Image
        src="/movie-grid logo1.png"
        alt="Movie Grid Logo"
        width={200} 
        height={100} 
        loading="eager"/>
        </div>
    );
}