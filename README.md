# FormData Validator

A versatile form data validation library offering a fluent API to ensure data integrity and consistency in web applications. Please note that this project is currently a work in progress and undergoing active development.

## Features

- Fluent validation API
- Supports various input types: boolean, date, file, number and string.
- Array validation using `[]` and `.*` notations
- Customizable validation rules
- Framework agnostic
- With 40+ [available rules](https://formdata-validator.sveltecult.com)

## Installation

To install, use your preferred package manager:

```bash
npm install @sveltecult/formdata-validator
```

## Getting Started

Detailed instructions on getting started and list of available validation rules can be found in the [documentation](https://formdata-validator.sveltecult.com).

### Basic Usage

```typescript
import { Rule, Validation } from '@sveltecult/formdata-validator';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const validation = new Validation(formData, {
			email: Rule.string().required().email(),
			password: Rule.string().required().minLength(8).confirmed()
		});

		const errors = await validation.errors();

		if (errors.any() === true) {
			console.log(errors.all());
		}
	}
};
```

## Writing Custom Validation

This library allows writing custom validation logic using the `.custom()` rule for scenarios where standard validation rules don't meet specific requirements, such as database-related checks. [Click here](https://formdata-validator.sveltecult.com/guides/custom) to learn more about how to create your own custom validation.

## License

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This library is licensed under the MIT License.
