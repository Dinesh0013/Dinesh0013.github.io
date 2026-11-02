/*
 * Blog posts — the only file you need to edit to publish a new post.
 *
 * To add a post, copy an entry below, paste it at the top of the array and change:
 *   slug     unique, lowercase-with-dashes; the post URL is blog.html?post=<slug>
 *   title    post title
 *   date     publication date, YYYY-MM-DD (posts are listed newest first)
 *   tags     short labels shown on the card and the post
 *   summary  one or two sentences shown on the blog list
 *   content  the post body as HTML (<h2>, <p>, <ul>, <a>, <code>, <blockquote> are styled)
 *
 * Inside `content` (a template literal) avoid backticks and the sequence ${ .
 */
window.BLOG_POSTS = [
  {
    slug: 'ml-attacks-chaos-image-encryption',
    title: 'Machine Learning Attacks on Chaos-Based Image Encryption',
    date: '2026-11-02',
    tags: ['MSc Dissertation', 'Cryptanalysis', 'Machine Learning', 'PyTorch'],
    summary:
      'A short overview of my MSc dissertation at Queen’s University Belfast, awarded Distinction: replicating and correcting a published deep-learning known-plaintext attack on a chaos-based image cipher, and raising attack accuracy from 9.74% to 97.27%.',
    content: `
      <p>
        My MSc Applied Cybersecurity dissertation at Queen's University Belfast, awarded <strong>Distinction</strong>,
        looked at machine learning attacks on chaos-based image encryption: image ciphers whose security rests on the
        behaviour of chaotic systems. The project replicated a published deep-learning known-plaintext attack against one
        such cipher, corrected it, and measured how well the attack performs.
      </p>

      <div class="post-stats">
        <div class="post-stat"><div class="val">97.27%</div><div class="lbl">Attack accuracy (from 9.74%)</div></div>
        <div class="post-stat"><div class="val">22.35M</div><div class="lbl">Model parameters</div></div>
        <div class="post-stat"><div class="val">7</div><div class="lbl">Ablation runs</div></div>
      </div>

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
        More on my coursework and marks is in <a href="index.html#results">Academic Results</a>.
      </blockquote>
    `
  }
];
