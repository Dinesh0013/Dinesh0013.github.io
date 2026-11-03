/*
 * Blog posts — the only file you need to edit to publish a new post.
 *
 * To add a post, copy an entry below, paste it at the top of the array and change:
 *   slug     unique, lowercase-with-dashes; the post URL is blog.html?post=<slug>
 *   title    post title
 *   date     publication date, YYYY-MM-DD (posts are listed newest first)
 *   tags     short labels shown under the title
 *   summary  one or two sentences, shown on the blog list and under the article title
 *   content  the post body as HTML. Styled elements:
 *              <h2> (each one appears in the "On this page" list), <h3>, <p>, <ul>, <ol>,
 *              <a>, <strong>, <code>, <pre><code>, <blockquote>, <figure> with <figcaption>,
 *              <table>, <hr>, and <dl class="facts"> for a key-figures table.
 *            Reading time is calculated automatically.
 *
 * Inside `content` (a template literal) avoid backticks and the sequence ${ .
 * For a code block use: <pre><code>...</code></pre> and escape < as &lt; and & as &amp;.
 */
window.BLOG_POSTS = [
  {
    slug: 'ml-attacks-chaos-image-encryption',
    title: 'Machine Learning Attacks on Chaos-Based Image Encryption',
    date: '2026-11-02',
    tags: ['MSc dissertation', 'Cryptanalysis', 'Machine learning', 'PyTorch'],
    summary:
      'A short overview of my MSc dissertation at Queen’s University Belfast, awarded Distinction: replicating and correcting a published deep-learning known-plaintext attack on a chaos-based image cipher, and raising attack accuracy from 9.74% to 97.27%.',
    content: `
      <p>
        My MSc Applied Cybersecurity dissertation at Queen's University Belfast, awarded <strong>Distinction</strong>,
        looked at machine learning attacks on chaos-based image encryption: image ciphers whose security rests on the
        behaviour of chaotic systems. The project replicated a published deep-learning known-plaintext attack against one
        such cipher, corrected it, and measured how well the attack performs.
      </p>

      <dl class="facts">
        <div><dt>Attack accuracy</dt><dd>97.27%<small>up from 9.74%</small></dd></div>
        <div><dt>Model size</dt><dd>22.35M<small>parameters</small></dd></div>
        <div><dt>Ablation</dt><dd>7 runs</dd></div>
        <div><dt>Dissertation</dt><dd>Distinction</dd></div>
      </dl>

      <h2>The attack setting</h2>
      <p>
        In a known-plaintext attack the adversary holds pairs of plaintext and matching ciphertext. Here the attack is
        framed as a learning problem: convolutional encoder&ndash;decoder networks are trained on such image pairs.
      </p>

      <h2>What I did</h2>
      <ul>
        <li>Replicated a published deep-learning known-plaintext attack against a chaos-based image cipher, and corrected it.</li>
        <li>Implemented the experiments in PyTorch, training convolutional encoder&ndash;decoders of 22.35M parameters.</li>
        <li>Ran a seven-run ablation under a leakage-free protocol, meaning evaluation data does not influence training.</li>
        <li>Used a deterministic, seeded experiment harness so that runs can be reproduced.</li>
      </ul>

      <h2>Result</h2>
      <p>
        The work raised attack accuracy from <strong>9.74% to 97.27%</strong>.
      </p>

      <h2>Adversary data budget as a security metric</h2>
      <p>
        A further contribution of the dissertation is introducing the <strong>adversary data budget</strong> &mdash; how
        much data the attacker has available &mdash; as a security metric, so that an attack result can be read in terms
        of what the adversary has to work with and not accuracy alone.
      </p>

      <h2>Takeaways</h2>
      <ul>
        <li>Reproduce a published attack before building on it.</li>
        <li>Evaluate under a leakage-free protocol, so a reported attack accuracy reflects the attack and not the evaluation setup.</li>
      </ul>

      <h2>Tools</h2>
      <p>Python, PyTorch, NumPy and SciPy.</p>

      <blockquote>
        This post is a short overview of the project and its headline results.
        My coursework and marks are on the <a href="index.html#education">education section</a> of the home page.
      </blockquote>
    `
  }
];
