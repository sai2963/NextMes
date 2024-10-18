export default async function MessagesLayout({ children }) {
    const response = await fetch('http://localhost:8080/messages', {
      headers: {
        'X-ID': 'layout',
      },
    });
    const messages = await response.json();
    const totalMessages = messages.length;
  
    return (
      <>
        
        <hr />
        {children}
      </>
    );
  }