import { Input } from "@progress/kendo-react-inputs";
import {
	Form,
	Field,
	FormElement,
	FieldRenderProps,
	FormRenderProps
} from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { FormRadioGroup, FormMaskedTextBox, FormDatePicker, FormInput, FormMultiSelect, FormTextArea } from "./FormComponents";
import { phoneValidator, DateOfBirthValidator, genderValidator, emailValidator, requiredValidator } from "../Validator";
import { User } from "../interfaces";
import { Button } from "@progress/kendo-react-buttons";

const FormUser = ({ defaultData, onSubmit, actionType }: { defaultData?: User, onSubmit?: (dataItem: { [name: string]: any; }) => void, actionType: 'add' | 'edit' | 'detail' }) => {
	return (
		<div className="overflow-auto max-h-[600px]">
			<Form
				onSubmit={onSubmit}
				initialValues={actionType === 'add' ? {} : { ...defaultData, date: new Date(defaultData?.date as string) }}
				render={(formRenderProps: FormRenderProps) => {
					if (actionType == 'detail') formRenderProps.allowSubmit = true
					return (
						<FormElement style={{ minWidth: 800 }}>
							<fieldset className={"k-form-fieldset"}>
								<div className="mb-3">
									<Field
										name={"name"}
										component={FormInput}
										label={"Name"}
										validator={requiredValidator}
										disabled={actionType === 'detail'}
									/>
								</div>

								<div className="mb-3">
									<Field
										id={"gender"}
										name={"gender"}
										label={"Gender"}
										layout={"horizontal"}
										component={FormRadioGroup}
										data={[
											{ label: "Male", value: "male" },
											{ label: "Female", value: "female" },
											{ label: "Other", value: "other" },
										]}
										validator={genderValidator}
										disabled={actionType === 'detail'}
									/>
								</div>
								<div className="mb-3">
									<Field
										id={"phoneNumber"}
										name={"phone"}
										label={"Phone Number"}
										mask={"(99) 000-00-00-00"}
										hint={"Hint: Your active phone number."}
										component={FormMaskedTextBox}
										validator={phoneValidator}
										disabled={actionType === 'detail'}
									/>
								</div>
								<div className="mb-3">
									<Field
										id={"date"}
										name={"date"}
										label={"Date of birth"}
										// hint={"Hint: Should be greater than today"}
										component={FormDatePicker}
										validator={DateOfBirthValidator}
										format="dd/MM/yyyy"
										disabled={actionType === 'detail'}
										max= {new Date()}
									/>
								</div>

								<div className="mb-3">
									<Field
										name={"email"}
										type={"email"}
										component={FormInput}
										label={"Email"}
										validator={emailValidator}
										disabled={actionType === 'detail'}
									/>
								</div>
								<div className="mb-3">
									<Field
										name={"describe"}
										component={FormTextArea}
										label={"Describe"}
										disabled={actionType === 'detail'}
									/>
								</div>
								<div className={"k-form-legend"}>
									Address:
								</div>
								<div className="grid grid-cols-4 gap-4">
									<Field name={"address.apartment_number"} component={Input} label={"Apartment Number"}
										disabled={actionType === 'detail'}
									/>
									<Field name={"address.ward"} component={Input} label={"Ward"}
										disabled={actionType === 'detail'}
									/>
									<Field name={"address.district"} component={Input} label={"District"}
										disabled={actionType === 'detail'}
									/>
									<Field name={"address.city"} component={Input} label={"City"}
										disabled={actionType === 'detail'}
									/>
								</div>
								<div className="mb-3">
									<Field
										name={"favorite"}
										component={FormMultiSelect}
										label={"Favorite"}
										data={[
											"Baseball",
											"Basketball",
											"Cricket",
											"Field Hockey",
											"Football",
											"Table Tennis",
											"Tennis",
											"Volleyball",
										]}
										disabled={actionType === 'detail'}
									/>
								</div>

							</fieldset>
							{actionType !== 'detail' ?
								<div className="space-x-4 float-right">
									<Button
										type={"submit"}
										disabled={!formRenderProps.allowSubmit}
										icon={"check"}
										themeColor={"info"}
										className="my-4"
										fillMode="solid"
									>
										Submit
									</Button>
								</div>
								: ''
							}
						</FormElement>
					)
				}}
			/>
		</div>
	);
};

export default FormUser