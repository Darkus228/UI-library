Vue.component('my-input', {
	props: {
		title: {
			type: String,
			default: 'Text',
			required: true
		},
		placeholder: {
			type: String,
			default: 'test',
			required: false
		},
		type: {
			type: String,
			default: 'text',
			required: false
		},
		required: {
			type: Boolean,
			default: false,
			required: true
		},
		validationRegExp: {
			type: RegExp,
			required: false
		},
		errorMessage: {
			type: String,
			required: false
		}
	},
	data() {
		return {
			invalidInput: false,
			invalidInputExpression: false
		}
	},
	methods: {
		setValidationInputValues: function (event) {
			this.invalidInput = this.required && !event.target.value.trim();
			this.invalidInputExpression = !event.target.value.match(this.validationRegExp)
		},
		updateValue(value) {
			this.$emit('input', value);
		}
	},
	computed: {
		getSpecificInputClass: function () {
			return {
				'input-danger': this.invalidInput || this.invalidInputExpression
			};
		}
	},
	template: `
<label class="input-label">{{title}} <span v-if="required">*</span>
  <input 
  	class="input"
  	@blur="setValidationInputValues"
		@input="updateValue($event.target.value)"
		:class="getSpecificInputClass"
		:placeholder="placeholder"
		:required="required"
		:type="type"
  >
  <span v-if="invalidInputExpression" style="color: red; font-weight: 300;">  {{errorMessage}}</span>
</label>
`
});
