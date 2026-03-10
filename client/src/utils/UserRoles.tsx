import type { UserInputProps } from "../types/types";
import { User, ShieldCheck, GraduationCap } from "lucide-react";

export default function UserRoles({
  inputHandler,
  formData,
}: UserInputProps & { formData: any }) {
  const roles = [
    {
      id: "student",
      label: "Student",
      icon: GraduationCap,
      desc: "Join events",
    },
    { id: "clubhead", label: "Club Head", icon: User, desc: "Manage events" },
    { id: "admin", label: "Admin", icon: ShieldCheck, desc: "System control" },
  ];

  return (
    <div className="flex flex-col gap-3 w-full">
      <label className="text-sm font-medium opacity-70 ml-1">
        Select Your Role
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roles.map((role) => (
          <div
            key={role.id}
            onClick={() => inputHandler({ field: "role", value: role.id })}
            className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 hover:bg-base-200 ${
              formData.role === role.id
                ? "border-primary bg-primary/10"
                : "border-base-300 opacity-60"
            }`}
          >
            <role.icon
              className={`${formData.role === role.id ? "text-primary" : ""}`}
              size={24}
            />
            <div className="text-center">
              <p className="font-bold text-sm">{role.label}</p>
              <p className="text-[10px] uppercase tracking-widest">
                {role.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
