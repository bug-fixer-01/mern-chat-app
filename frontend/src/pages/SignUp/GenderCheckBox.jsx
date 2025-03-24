

const GenderCheckBox = ({ onCheckboxChange, selectedGender }) => {


    return (
        <div className="flex">
            <div className="form-control">
                <label className={'label gap-2 cursor-pointer'}>
                    <span className="label-text text-black">Male</span>
                    <input type="checkbox" className="apperance-none checkbox border-none bg-[rgba(0,0,0,0.2)]"
                        checked={selectedGender === "male"}
                        onChange={() => onCheckboxChange("male")}
                    />
                </label>
            </div>
            <div className="form-control">
                <label className={'label gap-2 cursor-pointer'}>
                    <span className="label-text text-black">Female</span>
                    <input type="checkbox" className="checkbox border-none bg-[rgba(0,0,0,0.2)]"
                         checked={selectedGender === "female"}
                         onChange={() => onCheckboxChange("female")}
                     />
                </label>
            </div>
        </div>
    )
}
export default GenderCheckBox