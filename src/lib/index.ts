import nodemailer from 'nodemailer';
import deepmerge from 'deepmerge';
import {
	MAIL_FROM_ADDRESS,
	MAIL_FROM_NAME,
	MAIL_HOST,
	MAIL_PASSWORD,
	MAIL_PORT,
	MAIL_SSL,
	MAIL_USERNAME
} from '$env/static/private';
import type SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';

interface RecursiveKeyValuePair<K extends keyof any = string, V = string> {
	[key: string]: V | RecursiveKeyValuePair<K, V>;
}

type CSSRuleObject = RecursiveKeyValuePair<string, null | string | string[]>;

type MailerOptions = {
	to: string;
	from?: string;
	subject?: string;
};

type RenderOptions = {
	brand?:
		| boolean
		| Partial<{
				attrs: { [key: string]: any };
				css?: CSSRuleObject;
		  }>;
	colors?: Partial<{
		body: string;
		main: string;
		p: string;
		a: string;
		hr: string;
		action: {
			background: string;
			color: string;
			padding: string;
		};
		code: {
			background: string;
			color: string;
			padding: string;
		};
		[key: string]: any;
	}>;
};

/**
 * Represents an Email sender class for creating and sending emails with customizable layouts and content.
 */
export class Mail {
	/**
	 * The default layout of the email.
	 */
	protected layout = `
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
		<html lang="en">

		<body style="background-color::options.colors.body:;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,&quot;Helvetica Neue&quot;,Ubuntu,sans-serif">
			<table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;background-color::options.colors.main:;margin:0 auto;padding:20px 0 48px;margin-bottom:64px;border:1px solid #e4e4e7;border-radius:5px;">
			<tr style="width:100%">
				<td>
				<table style="padding:0 48px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
					<tbody>
					<tr>
						<td>
							:brand:
							:content:
						</td>
					</tr>
					</tbody>
				</table>
				</td>
			</tr>
			</table>
		</body>
		
		</html>
	`;

	/**
	 * The content of the email.
	 */
	protected content: string = '';

	/**
	 * Options for sending the email.
	 */
	protected mailerOptions: MailerOptions;

	/**
	 * Options to customize the rendering of the email.
	 */
	protected renderOptions: RenderOptions = {};

	/**
	 * Default rendering options.
	 */
	protected renderDefaults: RenderOptions = {
		brand: {
			attrs: {
				src: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg',
				alt: 'Svelte Logo',
				width: '40',
				height: '40'
			},
			css: {
				display: 'block',
				outline: 'none',
				border: 'none',
				'text-decoration': 'none'
			}
		},
		colors: {
			body: '#ffffff',
			main: '#ffffff',
			p: '#09090b',
			a: '#2563eb',
			hr: '#e4e4e7',
			action: {
				background: '#09090b',
				color: '#fafafa',
				padding: '10px'
			},
			code: {
				background: '#f4f4f5',
				color: '#09090b',
				padding: '10px'
			}
		}
	};

	/**
	 * Creates an instance of the Mail class.
	 * @param mailerOptions - Options for sending the email.
	 * @param renderOptions - Options to customize the rendering of the email.
	 */
	constructor(mailerOptions: MailerOptions, renderOptions: RenderOptions = {}) {
		this.mailerOptions = deepmerge(
			{
				from: `"${MAIL_FROM_NAME}" <${MAIL_FROM_ADDRESS}>`
			},
			mailerOptions
		) as {
			to: string;
			from?: string;
			subject?: string;
		};
		this.renderOptions = deepmerge(this.renderDefaults, renderOptions);
	}

	/**
	 * Sets the email template.
	 * @param template - The template to be used for the email layout.
	 */
	template(template: string) {
		this.layout = template;
	}

	/**
	 * Adds a paragraph to the email content.
	 * @param text - The text content to be added as a paragraph.
	 * @param css - CSS rules for styling the paragraph (optional).
	 * @returns The Mail instance.
	 */
	paragraph(
		text: string,
		css: CSSRuleObject = {
			'font-size': '16px',
			lineHeight: '24px',
			margin: '16px 0',
			color: this.renderOptions.colors.p,
			'text-align': 'left'
		}
	) {
		let content = `<p style="${this.inliner(css)}">${text}</p>`.replace(
			/<a\s+([^>]*)>/gi,
			(match, p1) => {
				if (!/style="[^"]*"/.test(match)) {
					return `<a ${p1} style="color:${this.renderOptions.colors.a};text-decoration:none">`;
				} else {
					return match;
				}
			}
		);

		this.content += content;

		return this;
	}

	/**
	 * Adds an action button to the email content.
	 * @param href - The URL the action button points to.
	 * @param text - The text content of the action button.
	 * @param css - CSS rules for styling the action button (optional).
	 * @returns The Mail instance.
	 */
	action(
		href: string,
		text: string,
		css: {
			outer: CSSRuleObject;
			inner: CSSRuleObject;
		} = {
			outer: {
				'background-color': this.renderOptions.colors.action.background,
				'border-radius': '5px',
				color: this.renderOptions.colors.action.color,
				'font-size': '16px',
				'font-weight': 'bold',
				'text-decoration': 'none',
				'text-align': 'center',
				display: 'inline-block',
				'line-height': '100%'
			},
			inner: {
				'background-color': this.renderOptions.colors.action.background,
				'border-radius': '5px',
				color: this.renderOptions.colors.action.color,
				'font-size': '16px',
				'font-weight': 'bold',
				'text-decoration': 'none',
				'text-align': 'center',
				display: 'inline-block',
				width: '100%',
				'max-width': '100%',
				'line-height': '120%',
				'text-transform': 'none',
				'mso-padding-alt': '0px',
				'mso-text-raise': '7.5px',
				padding: '10px'
			}
		}
	): this {
		this.content += `
			<a
				href="${href}"
				target="_blank"
				style="${this.inliner(css.outer)}"
			>
				<span>
					<!--[if mso]><i style="letter-spacing: 10px;mso-font-width:-100%;mso-text-raise:15" hidden>&nbsp;</i><![endif]-->
				</span>
				<span style="${this.inliner(css.inner)}">
					${text}
				</span>
				<span>
					<!--[if mso]><i style="letter-spacing: 10px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]-->
				</span>
			</a>
		`;

		return this;
	}

	/**
	 * Adds a code block to the email content.
	 * @param code - The code or number to be displayed.
	 * @param css - CSS rules for styling the code block (optional).
	 * @returns The Mail instance.
	 */
	code(
		code: string | number,
		css: {
			outer: CSSRuleObject;
			inner: CSSRuleObject;
		} = {
			outer: {
				background: this.renderOptions.colors.code.background,
				'border-radius': '5px',
				'margin-right': '0px',
				'margin-bottom': '30px',
				padding: '43px 23px'
			},
			inner: {
				color: this.renderOptions.colors.code.color,
				'font-family': 'monospace',
				'font-weight': '700',
				'font-size': '30px',
				'line-height': '24px',
				margin: '16px 0',
				'text-align': 'center',
				'vertical-align': 'middle'
			}
		}
	): this {
		this.content += `
			<table
				style="${this.inliner(css.outer)}"
				align="center"
				border="0"
				cellPadding="0"
				cellSpacing="0"
				role="presentation"
				width="100%"
			>
				<tbody>
					<tr>
						<td>
							<p style="${this.inliner(css.inner)}">${code}</p>
						</td>
					</tr>
				</tbody>
			</table>
	
		`;

		return this;
	}

	/**
	 * Adds a line divider to the email content.
	 * @param css - CSS rules for styling the line divider (optional).
	 * @returns The Mail instance.
	 */
	divider(
		css: CSSRuleObject = {
			width: '100%',
			border: 'none',
			'border-top': `1px solid ${this.renderOptions.colors.hr}`,
			'border-color': this.renderOptions.colors.hr,
			margin: '20px 0'
		}
	): this {
		this.content += `<hr style="${this.inliner(css)}" />`;

		return this;
	}

	/**
	 * Converts an object to HTML attributes.
	 * @param attributes - Object containing attributes and their values.
	 * @returns HTML attributes as a string.
	 * @private
	 */
	private attrs(attributes: { [key: string]: string }): string {
		return Object.keys(attributes)
			.map((key) => {
				const kebabCaseKey = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
				const value = attributes[key];

				return `${kebabCaseKey}="${value}"`;
			})
			.join(' ');
	}

	/**
	 * Converts CSS rules to inline CSS.
	 * @param css - CSS rules to be converted to inline CSS.
	 * @returns Inline CSS as a string.
	 * @private
	 */
	private inliner(css: CSSRuleObject) {
		let styles = '';

		const toKebabCase = (str: string) => {
			return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
		};

		for (const property in css) {
			if (Object.hasOwnProperty.call(css, property)) {
				const kebabCaseProperty = toKebabCase(property);
				styles += `${kebabCaseProperty}:${css[property]};`;
			}
		}

		return styles.trim();
	}

	/**
	 * Builds the final email content by replacing placeholders with actual content.
	 * @private
	 */
	private build() {
		if (typeof this.renderOptions.brand === 'object') {
			this.layout = this.layout.replace(
				':brand:',
				`<img ${this.attrs(this.renderOptions.brand.attrs)} style="${this.inliner(
					this.renderOptions.brand.css
				)}" /><hr style="width:100%;border:none;border-top:1px solid ${
					this.renderOptions.colors.hr
				};border-color:${this.renderOptions.colors.hr};margin:20px 0;">`
			);
		} else {
			this.layout = this.layout.replace(':brand:', '');
		}

		return this.layout
			.replace(':options.colors.body:', this.renderOptions.colors.body)
			.replace(':options.colors.main:', this.renderOptions.colors.main)
			.replace(':content:', this.content);
	}

	/**
	 * Asynchronously sends the email.
	 * @returns A promise indicating the success or failure of sending the email.
	 */
	async send(): Promise<SMTPTransport.SentMessageInfo> {
		const html = this.build();

		const transporter = nodemailer.createTransport({
			host: MAIL_HOST,
			port: Number(MAIL_PORT) || 0,
			secure: MAIL_SSL === 'true',
			auth: {
				user: MAIL_USERNAME,
				pass: MAIL_PASSWORD
			}
		});

		return await transporter.sendMail({
			from: this.mailerOptions.from,
			to: this.mailerOptions.to,
			subject: this.mailerOptions.subject,
			html: html
		});
	}
}
