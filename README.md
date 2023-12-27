# SvelteKit Mailer

This library allows you to send emails with nice and customizable layout and colors. With expressive syntax and simplifies the creation of common components like buttons, codes, paragraphs and more.

## Installation

To install, use your preferred package manager:

```bash
npm install @sveltecult/sveltekit-mailer
```

## Getting Started

To start using this library, you must first set your SMTP credentials to your `.env` file. Currently, only SMTP is supported.

```env
MAIL_MAILER=smtp
MAIL_HOST=
MAIL_PORT=
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_FROM_NAME=
MAIL_FROM_ADDRESS=
MAIL_SSL=false
```


## Basic Usage

```typescript
import { Mail } from '@sveltecult/sveltekit-mailer';

try {
    await new Mail({
        to: 'john@example.com',
        subject: 'Acme Verification'
    })
        .paragraph(
            'This link and code will only be valid for the next 5 minutes. If the link does not work, you can use the login verification code directly:'
        )
        .code('tt226-5398x')
        .send();
} catch (e) {
    console.log(e);
}
```

## Customizing Brand

To change the logo, its alt text, height, width, etc, you can modify the `brand.attrs` property on your `Mail`'s second argument.

```typescript
import { Mail } from '@sveltecult/sveltekit-mailer';

await new Mail(
	{
		to: 'john@example.com'
	},
	{
		brand: {
			attrs: {
				src: 'YOUR_LOGO_URL',
				width: '100',
				height: '100'
			}
		}
	}
).send();
```

You can even customize its CSS:

```typescript
import { Mail } from '@sveltecult/sveltekit-mailer';

await new Mail(
	{
		to: 'john@example.com'
	},
	{
		brand: {
			attrs: {
				src: 'YOUR_LOGO_URL',
				width: '100',
				height: '100'
			},
			css: {
				background: 'pink'
			}
		}
	}
).send();
```

## Disabling Brand

By default, every mail will use Svelte's logo. To remove the branding entirely, just set it to `false`.

```typescript
import { Mail } from '@sveltecult/sveltekit-mailer';

await new Mail(
    {
        to: 'john@example.com'
    },
    {
        brand: false
    }
).send()
```

## Changing Colors

You can easily change the default colors without changing the layout entirely. We use Tailwind CSS [color palette](https://tailwindcss.com/docs/customizing-colors) as the default.

```typescript
import { Mail } from '@sveltecult/sveltekit-mailer';

await new Mail(
    {
        to: 'john@example.com'
    },
    {
        colors: {
            body: '#f3f4f6',
            main: '#ffffff',
            p: '#0f172a',
            a: '#3b82f6',
            hr: '#f3f4f6',
            action: {
                background: '#3b82f6',
                color: '#ffffff',
                padding: '10px'
            },
            code: {
                background: '#000',
                color: '#fff',
                padding: '10px'
            }
        }
    }
).send();
```

## Available Functions:

### `.template(template: string)`

Entirely change the default email template.

### `.paragraph(text: string, css: CSSRuleObject = {})`

Adds a paragraph to the email content.

### `.action(href: string, text: string, css: { outer: CSSRuleObject; inner: CSSRuleObject; } = {})`

Adds an action button to the email content.

### `.code(code: string | number, css: { outer: CSSRuleObject; inner: CSSRuleObject; } = {})`

Adds a code block to the email content. Useful for OTP or any unique verification codes.

### `.divider(css: CSSRuleObject = {})`

Adds a line divider to the email content.

### `.send()`

Asynchronously sends the email.

## License

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This library is licensed under the MIT License.
