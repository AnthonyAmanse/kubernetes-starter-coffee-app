# Coffee Application

## Creating Deployments and Services via YAML configuration files

```bash
$ kubectl apply -f coffee-app.yaml
$ kubectl apply -f order-api.yaml
```

## Access Kubernetes Dashboard

```bash
$ kubectl proxy &
// port defaults to 8001
// add -p [port-number] to specify which port to run the proxy
// e.g. kubectl proxy -p 8080 &
```

Access the Kubernetes Dashboard on http://localhost:8001/ui


## Exposing and Accessing Application

  The application is exposed through the service configuration in the yaml files.  
  There are 2 ways to access the application.
  * Access via NodePort
    You will need your worker IP address and NodePort of the service

    Worker IP address:
    <pre>
    $ bx cs workers [cluster-name]
    OK
    ID                                                 <b>Public IP</b>      Private IP       Machine Type   State    Status   Version   
    kube-dal10-crbbdb1ff6a36846e9b2dfb522a07005af-w1   <b>169.60.123.123</b>   10.177.184.196   b1c.16x64      normal   Ready    1.7.4_1502*   
    </pre>
    NodePort:
    <pre>
    $ kubectl get svc
    NAME         CLUSTER-IP       EXTERNAL-IP     PORT(S)          AGE
    coffee-app   172.21.108.170   169.46.321.321   3000:<b>30080</b>/TCP   1h
    order-api    172.21.57.151    169.46.322.322   3001:<b>30081</b>/TCP   39m
    </pre>

    You will access the sample app through `http://169.60.123.123:30080`

  * Access via LoadBalancer

    You can get the external IP through:
    <pre>
    $ kubectl get svc
    NAME         CLUSTER-IP       <b>EXTERNAL-IP</b>     PORT(S)          AGE
    coffee-app   172.21.108.170   <b>169.46.321.321</b>   3000:30080/TCP   1h
    order-api    172.21.57.151    169.46.322.322   3001:30081/TCP   39m
    </pre>

    You will access the sample app through `http://169.60.321.321:3000`

## Scaling the Deployment

Scaling the coffee-app frontend
```bash
$ kubectl scale deploy coffee-app --replicas=2
kubectl get deployment "coffee-app" scaled
```

Scaling the order-api backend
```bash
$ kubectl scale deploy order-api --replicas=2
kubectl get deployment "order-api" scaled
```

You can scale up or down by specifying the number of replicas.

## Horizontal Pod Autoscaler

```bash
$ kubectl autoscale deployment coffee-app --cpu-percent=20 --min=1 --max=10
$ kubectl autoscale deployment order-api --cpu-percent=20 --min=1 --max=10

// Send load to the backend
//Ctrl + C to cancel
while true; do curl -X POST -H 'Content-Type: application/json' -d '{ "mocha": "1", "americano": "2", "espresso": "3", "latte": "4", "machhiato": "5" }' http://169.46.322.322:3001/process_order; done

// Send load to the frontend
//Ctrl + C to cancel
while true; do curl -s http://169.46.74.114:3000 > /dev/null; done
```

## Debugging the Application
To view the logs in a pod
<pre>
$ kubectl logs <i>[pod-name]</i>
or if you have multiple containers in a pod
$ kubectl logs <i>[pod-name] -c [container-name]</i>
</pre>
To execute a command in a pod
<pre>
$ kubectl exec [options] [pod-name]
e.g. kubectl exec <i>-ti</i> <i>coffee-app-1522168388-6v3nj</i> /bin/sh
<i>i option allows stdin to the container and t option makes it a tty</i>
<i>This will execute <b>/bin/sh</b> in the container</i>
</pre>

## Deletion of resources

```bash
$ kubectl delete -f coffee-app.yaml
$ kubectl delete -f order-api.yaml
$ kubectl delete hpa coffee-app order-api
```
