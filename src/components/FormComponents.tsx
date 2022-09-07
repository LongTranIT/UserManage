import * as React from "react";

import { FieldRenderProps, FieldWrapper } from "@progress/kendo-react-form";
import {
	Input,
	MaskedTextBox,
	NumericTextBox,
	Checkbox,
	ColorPicker,
	Switch,
	RadioGroup,
	Slider,
	SliderLabel,
	RangeSlider,
	TextArea,
	Rating,
} from "@progress/kendo-react-inputs";
import {
	DatePicker,
	TimePicker,
	DateTimePicker,
	DateRangePicker,
	DateInput,
} from "@progress/kendo-react-dateinputs";
import {
	Label,
	Error,
	Hint,
	FloatingLabel,
} from "@progress/kendo-react-labels";
import {
	DropDownList,
	AutoComplete,
	MultiSelect,
	ComboBox,
	MultiColumnComboBox,
	DropDownTree,
} from "@progress/kendo-react-dropdowns";

export const FormInput = (fieldRenderProps: FieldRenderProps) => {
	const {
		validationMessage,
		touched,
		label,
		id,
		valid,
		disabled,
		hint,
		type,
		optional,
		...others
	} = fieldRenderProps;

	const showValidationMessage: string | false | null =
		touched && validationMessage;
	const showHint: boolean = !showValidationMessage && hint;
	const hintId: string = showHint ? `${id}_hint` : "";
	const errorId: string = showValidationMessage ? `${id}_error` : "";

	return (
		<FieldWrapper>
			<Label
				editorId={id}
				editorValid={valid}
				editorDisabled={disabled}
				optional={optional}
			>
				{label}
			</Label>
			<div className={"k-form-field-wrap"}>
				<Input
					valid={valid}
					type={type}
					id={id}
					disabled={disabled}
					ariaDescribedBy={`${hintId} ${errorId}`}
					{...others}
				/>
				{showHint && <Hint id={hintId}>{hint}</Hint>}
				{showValidationMessage && (
					<Error id={errorId}>{validationMessage}</Error>
				)}
			</div>
		</FieldWrapper>
	);
};

export const FormRadioGroup = (fieldRenderProps: FieldRenderProps) => {
	const {
		validationMessage,
		touched,
		id,
		label,
		valid,
		disabled,
		hint,
		visited,
		modified,
		...others
	} = fieldRenderProps;
	const editorRef = React.useRef<any>(null);

	const showValidationMessage: string | false | null =
		touched && validationMessage;
	const showHint: boolean = !showValidationMessage && hint;
	const hintId: string = showHint ? `${id}_hint` : "";
	const errorId: string = showValidationMessage ? `${id}_error` : "";
	const labelId: string = label ? `${id}_label` : "";

	return (
		<FieldWrapper>
			<Label
				id={labelId}
				editorRef={editorRef}
				editorId={id}
				editorValid={valid}
				editorDisabled={disabled}
			>
				{label}
			</Label>
			<RadioGroup
				ariaDescribedBy={`${hintId} ${errorId}`}
				ariaLabelledBy={labelId}
				valid={valid}
				disabled={disabled}
				ref={editorRef}
				{...others}
			/>
			{showHint && <Hint id={hintId}>{hint}</Hint>}
			{showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
		</FieldWrapper>
	);
};

export const FormMaskedTextBox = (fieldRenderProps: FieldRenderProps) => {
	const {
		validationMessage,
		touched,
		label,
		id,
		valid,
		hint,
		optional,
		...others
	} = fieldRenderProps;

	const showValidationMessage: string | false | null =
		touched && validationMessage;
	const showHint: boolean = !showValidationMessage && hint;
	const hintId: string = showHint ? `${id}_hint` : "";
	const errorId: string = showValidationMessage ? `${id}_error` : "";

	return (
		<FieldWrapper>
			<Label editorId={id} editorValid={valid} optional={optional}>
				{label}
			</Label>
			<div className={"k-form-field-wrap"}>
				<MaskedTextBox
					ariaDescribedBy={`${hintId} ${errorId}`}
					valid={valid}
					id={id}
					{...others}
				/>
				{showHint && <Hint id={hintId}>{hint}</Hint>}
				{showValidationMessage && (
					<Error id={errorId}>{validationMessage}</Error>
				)}
			</div>
		</FieldWrapper>
	);
};

export const FormDatePicker = (fieldRenderProps: FieldRenderProps) => {
    const {
        validationMessage, touched, label, id, valid,
        disabled, hint, wrapperStyle, hintDirection, ...others
    } = fieldRenderProps;

    const showValidationMessage: string | false | null = touched && validationMessage;
    const showHint: boolean = !showValidationMessage && hint
    const hintId: string = showHint ? `${id}_hint` : '';
    const errorId: string = showValidationMessage ? `${id}_error` : '';
    const labelId: string = label ? `${id}_label` : '';

    return (
      <FieldWrapper style={wrapperStyle}>
        <Label id={labelId} editorId={id} editorValid={valid} editorDisabled={disabled}>
          {label}
        </Label>
        <div className={'k-form-field-wrap'}>
          <DatePicker
            ariaLabelledBy={labelId}
            ariaDescribedBy={`${hintId} ${errorId}`}
            valid={valid}
            id={id}
            disabled={disabled}
            {...others}
                />
          {
                    showHint &&
                    <Hint id={hintId} direction={hintDirection}>{hint}</Hint>
                }
          {
                    showValidationMessage &&
                    <Error id={errorId}>{validationMessage}</Error>
                }
        </div>
      </FieldWrapper>
    );
};

export const FormMultiSelect = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, touched, label, id, valid, disabled, hint, wrapperStyle, ...others } = fieldRenderProps;
    const editorRef = React.useRef<any>(null);
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";
    const labelId = label ? `${id}_label` : "";

    return (
      <FieldWrapper style={wrapperStyle}>
        <Label
          id={labelId}
          editorRef={editorRef}
          editorId={id}
          editorValid={valid}
          editorDisabled={disabled}
            >
          {label}
        </Label>
        <MultiSelect
          ariaLabelledBy={labelId}
          ariaDescribedBy={`${hintId} ${errorId}`}
          ref={editorRef}
          valid={valid}
          id={id}
          disabled={disabled}
          {...others}
            />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </FieldWrapper>
    );
};

export const FormTextArea = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, touched, label, id, valid, hint, disabled, optional, ...others } = fieldRenderProps;

    const showValidationMessage: string | false | null = touched && validationMessage;
    const showHint: boolean = !showValidationMessage && hint
    const hintId: string = showHint ? `${id}_hint` : '';
    const errorId: string = showValidationMessage ? `${id}_error` : '';

    return (
      <FieldWrapper>
        <Label editorId={id} editorValid={valid} optional={optional}>{label}</Label>
        <TextArea
          valid={valid}
          id={id}
          disabled={disabled}
          ariaDescribedBy={`${hintId} ${errorId}`}
          {...others}
            />
        {
                showHint &&
                <Hint id={hintId}>{hint}</Hint>
            }
        {
                showValidationMessage &&
                <Error id={errorId}>{validationMessage}</Error>
            }
      </FieldWrapper>
    );
};