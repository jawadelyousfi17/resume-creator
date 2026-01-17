import { uploadImage } from "@/actions/uploads/uoloadImage";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { T_Resume } from "@/types/resumeInfos";
import { Dispatch, SetStateAction, useState } from "react";

const PersonalDetails = ({
  data,
  setData,
}: {
  data: T_Resume;
  setData: Dispatch<SetStateAction<T_Resume>>;
}) => {
  const [isUploading, setIsUploading] = useState(false);

  async function handleUploadImage(file: File) {
    setIsUploading(true);
    const { error, url } = await uploadImage(file);
    setIsUploading(false);
    if (url)
      setData((prev) => ({
        ...prev,
        personalDetails: {
          ...prev.personalDetails,
          profileImageUrl: url,
        },
      }));
  }

  return (
    <div className="bg-background p-4 space-y-5">
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold font-serif">Personal details</span>
        <span className="text-xs font-light text-foreground/50">
          Users who added phone numbers and email received 64% more fedback from
          recruiters.
        </span>
      </div>

      <div className="flex gap-6">
        <div className="flex flex-col gap-4 flex-1 w-full">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-light text-foreground/60">
              Job target
            </label>
            <Input
              value={data?.personalDetails.jobTarget}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  personalDetails: {
                    ...prev.personalDetails,
                    jobTarget: e.target.value,
                  },
                }))
              }
              placeholder="The role you want"
              className="bg-muted"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-light text-foreground/60">
              First Nmae
            </label>
            <Input
              value={data?.personalDetails.firstName}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  personalDetails: {
                    ...prev.personalDetails,
                    firstName: e.target.value,
                  },
                }))
              }
              placeholder="Your First Name"
              className="bg-muted"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-light text-foreground/60">
              Email
            </label>
            <Input
              value={data?.personalDetails.email}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  personalDetails: {
                    ...prev.personalDetails,
                    email: e.target.value,
                  },
                }))
              }
              placeholder="Your Email"
              className="bg-muted"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-light text-foreground/60">
              LinkedIn URL
            </label>
            <Input
              value={data?.personalDetails.linkedInProfile}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  personalDetails: {
                    ...prev.personalDetails,
                    linkedInProfile: e.target.value,
                  },
                }))
              }
              placeholder="linkedin.com/in/yourprofile"
              className="bg-muted"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-light text-foreground/60">
              City, State
            </label>
            <Input
              value={data?.personalDetails.cityState}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  personalDetails: {
                    ...prev.personalDetails,
                    cityState: e.target.value,
                  },
                }))
              }
              placeholder="Where you live"
              className="bg-muted"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1 w-full">
          <div className="flex items-center gap-4">
            <Input
              id="image-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const result = e.target?.result as string;
                    setData((prev) => ({
                      ...prev,
                      personalDetails: {
                        ...prev.personalDetails,
                        profileImageUrl: result,
                      },
                    }));
                  };
                  reader.readAsDataURL(file);
                  await handleUploadImage(file);
                }
              }}
            />
            <label
              htmlFor="image-upload"
              className={cn("flex items-center gap-3  cursor-pointer group")}
            >
              <div className=" flex justify-center items-center h-18 w-18 rounded-2xl bg-muted shrink-0 overflow-hidden relative">
                {isUploading && (
                  <div className="absolute w-full h-full opacity-80 bg-background top-0 left-0 flex justify-center items-center">
                    <Spinner />
                  </div>
                )}
                {data.personalDetails.profileImageUrl ? (
                  <img
                    src={data.personalDetails.profileImageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  ></img>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        opacity="0.5"
                        d="M9.77778 21H14.2222C17.3433 21 18.9038 21 20.0248 20.2646C20.51 19.9462 20.9267 19.5371 21.251 19.0607C22 17.9601 22 16.4279 22 13.3636C22 10.2994 22 8.76721 21.251 7.6666C20.9267 7.19014 20.51 6.78104 20.0248 6.46268C19.3044 5.99013 18.4027 5.82123 17.022 5.76086C16.3631 5.76086 15.7959 5.27068 15.6667 4.63636C15.4728 3.68489 14.6219 3 13.6337 3H10.3663C9.37805 3 8.52715 3.68489 8.33333 4.63636C8.20412 5.27068 7.63685 5.76086 6.978 5.76086C5.59733 5.82123 4.69555 5.99013 3.97524 6.46268C3.48995 6.78104 3.07328 7.19014 2.74902 7.6666C2 8.76721 2 10.2994 2 13.3636C2 16.4279 2 17.9601 2.74902 19.0607C3.07328 19.5371 3.48995 19.9462 3.97524 20.2646C5.09624 21 6.65675 21 9.77778 21Z"
                        fill="#1C274C"
                        className="fill-muted-foreground group-hover:fill-primary "
                      ></path>{" "}
                      <path
                        d="M17.5562 9.27246C17.096 9.27246 16.7229 9.63877 16.7229 10.0906C16.7229 10.5425 17.096 10.9088 17.5562 10.9088H18.6673C19.1276 10.9088 19.5007 10.5425 19.5007 10.0906C19.5007 9.63877 19.1276 9.27246 18.6673 9.27246H17.5562Z"
                        fill="#1C274C"
                        className="fill-muted"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.0007 9.27246C9.69946 9.27246 7.83398 11.104 7.83398 13.3634C7.83398 15.6227 9.69946 17.4543 12.0007 17.4543C14.3018 17.4543 16.1673 15.6227 16.1673 13.3634C16.1673 11.104 14.3018 9.27246 12.0007 9.27246ZM12.0007 10.9088C10.6199 10.9088 9.50065 12.0078 9.50065 13.3634C9.50065 14.719 10.6199 15.8179 12.0007 15.8179C13.3814 15.8179 14.5007 14.719 14.5007 13.3634C14.5007 12.0078 13.3814 10.9088 12.0007 10.9088Z"
                        fill="#1C274C"
                        className="fill-muted"
                      ></path>{" "}
                    </g>
                  </svg>
                )}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm group-hover:text-primary">
                  Upload your image
                </span>
                <span className="text-xs font-light text-foreground/50 group-hover:text-primary/50">
                  Learn more about profile choice
                </span>
              </div>
            </label>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-light text-foreground/60">
              Last Name
            </label>
            <Input
              value={data?.personalDetails.lastName}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  personalDetails: {
                    ...prev.personalDetails,
                    lastName: e.target.value,
                  },
                }))
              }
              placeholder="Your Last Name"
              className="bg-muted"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-light text-foreground/60">
              Phone
            </label>
            <Input
              value={data?.personalDetails.phone}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  personalDetails: {
                    ...prev.personalDetails,
                    phone: e.target.value,
                  },
                }))
              }
              placeholder="Your Phone Number"
              className="bg-muted"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-light text-foreground/60">
              Postal Code
            </label>
            <Input
              value={data?.personalDetails.postalCode}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  personalDetails: {
                    ...prev.personalDetails,
                    postalCode: e.target.value,
                  },
                }))
              }
              placeholder="Postal Code"
              className="bg-muted"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-light text-foreground/60">
              Country
            </label>
            <Input
              value={data?.personalDetails.country}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  personalDetails: {
                    ...prev.personalDetails,
                    country: e.target.value,
                  },
                }))
              }
              placeholder="Country"
              className="bg-muted"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
