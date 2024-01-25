import { assertEquals } from '$std/assert/assert_equals.ts';
import { EmailReplyParser } from '../lib/email-reply-parser.ts';
import { fixtures } from './fixtures.ts';

const COMMON_FIRST_FRAGMENT =
  'Fusce bibendum, quam hendrerit sagittis tempor, dui turpis tempus erat, pharetra sodales ante sem sit amet metus.\n\
Nulla malesuada, orci non vulputate lobortis, massa felis pharetra ex, convallis consectetur ex libero eget ante.\n\
Nam vel turpis posuere, rhoncus ligula in, venenatis orci. Duis interdum venenatis ex a rutrum.\n\
Duis ut libero eu lectus consequat consequat ut vel lorem. Vestibulum convallis lectus urna,\n\
et mollis ligula rutrum quis. Fusce sed odio id arcu varius aliquet nec nec nibh.';

function get_email(name: string) {
  const data = fixtures[name];

  return new EmailReplyParser().read(data);
}

Deno.test('test_email_gmail_no', () => {
  const email = get_email('email_norwegian_gmail');
  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
});

Deno.test('test_reads_simple_body', () => {
  const reply = get_email('email_1');
  assertEquals(2, reply.fragments.length);

  assertEquals(
    [false, false],
    reply.fragments.map((i) => i.isQuoted)
  );

  assertEquals(
    [false, true],
    reply.fragments.map((i) => i.isHidden)
  );

  assertEquals(
    'Hi folks\n\nWhat is the best way to clear a Riak bucket of all key, values after\nrunning a test?\nI am currently using the Java HTTP API.\n\n-Abhishek Kona\n\n',
    reply.fragments[0].toString()
  );
});

// Deno.test('test_reads_top_post', () => {
//   const email = get_email('email_3');

//   const fragments = email.getFragments();

//   assertEquals(
//     'Hi folks\n\nWhat is the best way to clear a Riak bucket of all key, values after\nrunning a test?\nI am currently using the Java HTTP API.\n\n-Abhishek Kona\n\n',
//     fragments[0].toString()
//   );
// });

Deno.test('test_reads_bottom_post', () => {
  const email = get_email('email_2');

  const fragments = email.getFragments();
  assertEquals(6, fragments.length);

  assertEquals('Hi,', fragments[0].toString());
  assertEquals(true, /^On [^\:]+\:/.test(fragments[1].toString()));
  assertEquals(true, /^You can list/.test(fragments[2].toString()));
  assertEquals(true, /^>/.test(fragments[3].toString()));
  assertEquals(true, /^_/.test(fragments[5].toString()));
});

Deno.test('test_recognizes_data_string_above_quote', () => {
  const email = get_email('email_4');

  const fragments = email.getFragments();

  assertEquals(true, /^Awesome/.test(fragments[0].toString()));
  assertEquals(true, /^On/.test(fragments[1].toString()));
  assertEquals(true, /Loader/.test(fragments[1].toString()));
});

Deno.test('test_complex_body_with_only_one_fragment', () => {
  const email = get_email('email_5');

  const fragments = email.getFragments();

  assertEquals(1, fragments.length);
});

Deno.test('test_deals_with_multiline_reply_headers', () => {
  const email = get_email('email_6');

  const fragments = email.getFragments();

  assertEquals(true, /^I get/.test(fragments[0].toString()));
  assertEquals(true, /^On/.test(fragments[1].toString()));
  assertEquals(true, /Was this/.test(fragments[1].toString()));
});

Deno.test('test_email_with_italian', () => {
  const email = get_email('email_7');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
});

Deno.test('test_email_with_dutch', () => {
  const email = get_email('email_8');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
});

Deno.test('test_email_with_signature', () => {
  const email = get_email('email_9');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
});

Deno.test('test_email_with_hotmail', () => {
  const email = get_email('email_10');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
});

Deno.test('test_email_whitespace_before_header', () => {
  const email = get_email('email_11');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
});

Deno.test('test_email_square_brackets', () => {
  const email = get_email('email_12');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
});

Deno.test('test_email_da_into_italian', () => {
  const email = get_email('email_13');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
});

Deno.test('test_email_header_polish', () => {
  const email = get_email('email_14');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
});

Deno.test('test_email_sent_from_my', () => {
  const email = get_email('email_15');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
});

Deno.test('test_email_header_polish_with_dnia_and_napisala', () => {
  const email = get_email('email_16');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
});

Deno.test('test_email_header_polish_with_date_in_iso8601', () => {
  const email = get_email('email_17');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
});

Deno.test('test_email_outlook_en', () => {
  const email = get_email('email_18');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
});

Deno.test('test_email_22', () => {
  const email = get_email('email_22');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
});

Deno.test('test_email_23', () => {
  const email = get_email('email_23');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
});

Deno.test('test_email_25', () => {
  const email = get_email('email_25');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
});

Deno.test('test_email_26', () => {
  const email = get_email('email_26');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
});

Deno.test('test_email_portuguese', () => {
  const email = get_email('email_portuguese');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
});

Deno.test('test_email_german', () => {
  const email = get_email('email_german');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
});

Deno.test('test_email_gmail_no', () => {
  const email = get_email('email_norwegian_gmail');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
});

Deno.test('test_email_finnish', () => {
  const email = get_email('email_finnish');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
});

Deno.test('test_email_with_correct_signature', () => {
  const email = get_email('correct_sig');

  const fragments = email.getFragments();

  assertEquals(2, fragments.length);
  assertEquals(false, fragments[1].isQuoted);
  assertEquals(false, fragments[0].isSignature);
  assertEquals(true, fragments[1].isSignature);
  assertEquals(false, fragments[0].isHidden);
  assertEquals(true, fragments[1].isHidden);

  assertEquals(true, /^--\nrick/.test(fragments[1].toString()));
});

Deno.test('test_reads_email_with_signature_with_no_empty_line_above', () => {
  const email = get_email('sig_no_empty_line');

  const fragments = email.getFragments();

  assertEquals(2, fragments.length);
  assertEquals(false, fragments[0].isQuoted);
  assertEquals(false, fragments[1].isQuoted);

  assertEquals(false, fragments[0].isSignature);
  assertEquals(true, fragments[1].isSignature);

  assertEquals(false, fragments[0].isHidden);
  assertEquals(true, fragments[1].isHidden);

  assertEquals(true, /^--\nrick/.test(fragments[1].toString()));
});

Deno.test('test_one_is_not_one', () => {
  const email = get_email('email_one_is_not_on');

  const fragments = email.getFragments();

  assertEquals(true, /One outstanding question/.test(fragments[0].toString()));
  assertEquals(true, /^On Oct 1, 2012/.test(fragments[1].toString()));
});

Deno.test('test_sent_from', () => {
  const email = get_email('email_sent_from');

  assertEquals(
    email.getVisibleText(),
    'Hi it can happen to any texts you type, as long as you type in between words or paragraphs.\n'
  );
});

Deno.test('test_email_emoji', () => {
  const email = get_email('email_emoji');

  assertEquals(
    email.getVisibleText(),
    '🎉\n\n—\nJohn Doe\nCEO at Pandaland\n\n@pandaland'
  );
});

// Deno.test('test_email_not_a_signature', () => {
//   const email = get_email('email_not_a_signature');

//   const fragments = email.getFragments();

//   ;
// });

Deno.test('test_email_24', () => {
  const email = get_email('email_24');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
});

Deno.test('test_email_outlook', () => {
  const email = get_email('email_outlook_split_line_from');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
  assertEquals(2, fragments.length);
});

Deno.test('test_email_gmail', () => {
  const email = get_email('email_gmail_split_line_from');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
  assertEquals(2, fragments.length);
});

Deno.test('text_email_reply_header', () => {
  const email = get_email('email_reply_header');

  const fragments = email.getFragments();

  const firstFragmentRegex = /^On the other hand/m;
  const secondFragmentRegex = /^On Wed, Dec 9/m;

  assertEquals(firstFragmentRegex.test(fragments[0].toString().trim()), true);
  assertEquals(secondFragmentRegex.test(fragments[1].toString().trim()), true);
});

Deno.test('text_email_ios_outlook', () => {
  const email = get_email('email_ios_outlook');

  const fragments = email.getFragments();
  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
  assertEquals(3, fragments.length);
});

Deno.test('text_email_msn', () => {
  const email = get_email('email_msn');

  const fragments = email.getFragments();
  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
  assertEquals(2, fragments.length);
});

Deno.test('text_email_zoho', () => {
  const email = get_email('email_zoho');

  const fragments = email.getFragments();

  assertEquals(
    'What is the best way to clear a Riak bucket of all key, values after\nrunning a test?\n',
    fragments[0].toString()
  );
});

Deno.test('text_email_regards', () => {
  const email = get_email('email_with_regards');

  const fragments = email.getFragments();

  assertEquals(
    'Hi,\n\nI still have the same problem....\n\nCan you help?\n',
    fragments[0].toString()
  );
});

Deno.test('test_email_fr_multiline', () => {
  const email = get_email('email_fr_multiline');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
  assertEquals(2, fragments.length);
});

Deno.test('test_email_en_multiline_2', () => {
  const email = get_email('email_en_multiline_2');

  const fragments = email.getFragments();

  assertEquals(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
  assertEquals(2, fragments.length);
});
