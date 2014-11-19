using System;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace SignalRChat
{
    public class ChatHub : Hub
    {
        static private List<string> _connections = new List<string>();

        #region Class Overrides
        public override Task OnConnected()
        {
            _connections.Add(Context.ConnectionId);
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            _connections.Remove(Context.ConnectionId);
            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {
            if (!_connections.Contains(Context.ConnectionId))
            {
                _connections.Add(Context.ConnectionId);
            }

            return base.OnReconnected();
        }
        #endregion

        public void Send(string name, string message)
        {
            // Call the addNewMessageToPage method to update clients.
            Clients.All.addNewMessageToPage(name, message);
        }

        public void Alert(string message)
        {
            Clients.All.AlertToPage(message);
        }

        public void SendWhisper(string name, string message)
        {
            List<string> tempConnections = new List<string>(_connections);
            tempConnections.Remove(Context.ConnectionId);
            if (tempConnections.Count > 0)
            {
                Random rnd = new Random();
                int r = rnd.Next(tempConnections.Count);
                Clients.Client(tempConnections[r]).WhisperToOne(message);
            }
        }
    }
}