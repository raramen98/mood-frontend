export const metadata = { title: '오늘 기분' };

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ fontFamily: 'system-ui', maxWidth: 420, margin: '40px auto', padding: '0 16px' }}>
        {children}
      </body>
    </html>
  );
}
