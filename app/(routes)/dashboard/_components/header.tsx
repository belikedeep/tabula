import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image"

export const Header = () => {
    const { user } = useKindeBrowserClient();
    return (
        <div className="flex justify-end w-full p-10">
            <div>
                <Input placeholder="Search" type="text" />
            </div>
            <div>
                {user?.picture ? (
                    <Image src={user?.picture} alt="user image" width={30} height={30} className="rounded-full" />
                ) : null}
            </div>
            <div>
                <Button >Invite</Button>
            </div>
        </div>
    )
}
