export const confetti = {
  confetti: [
    {
      options: [
        {
          value: 'birthday',
          name: 'Birthday',
        },
        {
          name: 'Wedding',
          value: 'wedding',
        },
        {
          value: 'stagparty',
          name: 'Stag Party',
        },
      ],
      type: 'radios',
      validation: {
        required: true,
      },
      key: 'type',
    },
    {
      placeholder: 'Compose message...',
      type: 'textarea',
      validation: {
        maxLength: 250,
        validationMessage: 'Personal message is required!',
        required: true,
      },
      title: 'Your Personal Message to Suppliers',
      key: 'body',
    },
    {
      key: 'name',
      placeholder: 'Your name...',
      type: 'string',
      validation: {
        required: true,
      },
      title: 'Name',
    },
    {
      title: 'Email',
      key: 'email',
      placeholder: 'Your email...',
      type: 'string',
      validation: {
        required: true,
        pattern: '^\\S+@\\S+$',
      },
    },
    {
      key: 'date',
      placeholder: 'Date of your event',
      type: 'date',
      validation: {
        required: true,
        minDate: '2018-01-21',
      },
    },
    {
      type: 'submit',
      title: 'Get Quotes',
    },
  ],
};

export const magician = {
  magician: [
    {
      key: 'magictype',
      options: [
        { name: 'Mix and mingle magic', value: 'mixmingle' },
        { name: 'Magic show', value: 'magicshow' },
        { name: 'Table magic', value: 'tablemagic' },
      ],
      title: 'How would you like the magic performed?',
      type: 'radios',
      validation: { required: true },
    },
    {
      key: 'magicstyle',
      options: [
        { name: 'Illusionist', value: 'illusionist' },
        { name: 'Escapologist', value: 'escapologist' },
        { name: 'Close Up', value: 'closeup' },
      ],
      title: 'What types of magic would you like performed?',
      type: 'radios',
      validation: { required: true },
    },
    {
      key: 'eventType',
      options: [
        { name: 'Birthday', value: 'birthday' },
        { name: 'Wedding', value: 'wedding' },
        { name: 'Stag Party', value: 'stagparty' },
      ],
      title: 'Event type',
      type: 'radios',
      validation: { required: true },
    },
    {
      key: 'body',
      placeholder: 'Compose message...',
      title: 'Your Personal Message to Suppliers',
      type: 'textarea',
      validation: {
        maxLength: 250,
        required: true,
        validationMessage: 'Personal message is required!',
      },
    },
    {
      key: 'name',
      placeholder: 'Your name...',
      title: 'Name',
      type: 'string',
      validation: { required: true },
    },
    {
      key: 'email',
      placeholder: 'Your email...',
      title: 'Email',
      type: 'string',
      validation: { pattern: '^\\S+@\\S+$', required: true },
    },
    {
      key: 'date',
      placeholder: 'Date of your event',
      type: 'date',
      validation: { minDate: '2018-01-21', required: true },
    },
    { title: 'Get Quotes', type: 'submit' },
  ],
};

export const magicianAltered = {
  magician: [
    {
      key: 'magictype',
      options: [
        { name: 'Mix and mingle magic', value: 'mixmingle' },
        { name: 'Magic show', value: 'magicshow' },
      ],
      title: 'How would you like the magic performed?',
      type: 'button',
      validation: { required: false },
    },
    {
      key: 'magicstyle',
      options: [
        { name: 'Illusionist', value: 'illusionist' },
        { name: 'Close Up', value: 'closeup' },
      ],
      title: 'What types of magic would you like performed?',
      type: 'radios',
      validation: { required: true },
    },
    {
      key: 'eventType',
      options: [
        { name: 'Wedding', value: 'wedding' },
        { name: 'Stag Party', value: 'stagparty' },
      ],
      title: 'Event type',
      type: 'radios',
      validation: { required: true },
    },
    {
      key: 'body',
      placeholder: 'Compose message...',
      title: 'Your Personal Message to Suppliers',
      type: 'textarea',
      validation: {
        maxLength: 250,
        required: true,
        validationMessage: 'Personal message is required!',
      },
    },
    {
      key: 'lastname',
      placeholder: 'Your last name...',
      title: 'Last name',
      type: 'string',
      validation: { required: true },
    },
    {
      key: 'email',
      placeholder: 'Your email...',
      title: 'Email',
      type: 'string',
      validation: { pattern: '^\\S+@\\S+$', required: true },
    },
    {
      key: 'date',
      placeholder: 'Date of your event',
      type: 'date',
      validation: { minDate: '2018-01-21', required: true },
    },
    { title: 'Get Quotes', type: 'submit' },
  ],
};
